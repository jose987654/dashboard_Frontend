import React, { createContext, useContext, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { getConsoleData, getAdCampaigns } from '../services';

const DataContext = createContext();

// Create a provider component to wrap your app and provide the context value
export const DataProvider = ({ children }) => {
  const [data, setData] = useState([]);
  const [adData, setAdData] = useState([]);
  const [clickData, setClickData] = useState([]);
  const [CountryClicks, setSortedCountryClicks] = useState([]);
  const [ads, setads] = useState([]);
  const [loading, setLoading] = useState(true);
  const [monthlySum, setMonthlySum] = useState([]);

  const fetchData = async () => {
    try {
      // const [consoleData, adData] = await Promise.all([getConsoleData(), getAdCampaigns()]);
      // const res = consoleData?.data;
      // const res_2 = adData.data.campaigns.length;
      // setData(res);
      // setads(adData?.data);
      // setAdData(res_2);
      const [consoleDataPromise, adDataPromise] = await Promise.allSettled([getConsoleData(), getAdCampaigns()]);

      // Handle consoleDataPromise result
      const res = consoleDataPromise.status === 'fulfilled' ? consoleDataPromise.value.data : [];

      // Handle adDataPromise result
      const adResult = adDataPromise.status === 'fulfilled' ? adDataPromise.value.data.campaigns : [];

      setData(res);
      setads(adResult);

      // Assuming you want to set the length of ad campaigns even if the promise fails
      const adDataLength = adDataPromise.status === 'fulfilled' ? adDataPromise.value.data.campaigns.length : 0;
      setAdData(adDataLength);

      if (res && res.search_analytics_data && res.search_analytics_data.rows) {
        const { rows } = res.search_analytics_data;

        // Parallelize these operations
        const [sum, monthlySumData] = await Promise.all([
          // Calculate sum asynchronously
          new Promise((resolve) => {
            const sum = rows.reduce(
              (acc, row) => {
                acc.clicks += row.clicks;
                acc.impressions += row.impressions;
                acc.ctr += row.ctr;
                return acc;
              },
              { clicks: 0, impressions: 0, ctr: 0 }
            );
            resolve(sum);
          }),

          // Calculate monthlySumData asynchronously
          new Promise((resolve) => {
            const currentDate = new Date();
            const currentMonth = currentDate.getMonth() + 1;
            const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

            const monthlySumData = rows.reduce((acc, row) => {
              const monthKey = row.keys[0].substring(0, 7);
              const date = new Date(monthKey);

              if (date >= new Date(currentDate.getFullYear() - 1, currentMonth - 1, 1)) {
                if (!acc[monthKey]) {
                  acc[monthKey] = {
                    clicks: 0,
                    impressions: 0,
                    ctr: 0,
                    year: date.getFullYear(),
                    month: date.getMonth() + 1,
                    monthName: monthNames[date.getMonth()]
                  };
                }

                acc[monthKey].clicks += row.clicks;
                acc[monthKey].impressions += row.impressions;
                acc[monthKey].ctr += row.ctr;
              }

              return acc;
            }, {});

            resolve(Object.values(monthlySumData));
          })
        ]);

        setClickData(sum.clicks);
        console.log('Sum of clicks:', sum.clicks);
        console.log('Sum of impressions:', sum.impressions);
        console.log('Sum of ctr:', sum.ctr);

        console.log('monthly ', monthlySumData);
        setMonthlySum(monthlySumData);
      }

      const popularCountriesData = res.popular_countries_data;
      const countryClicksMap = {};

      if (popularCountriesData && popularCountriesData.rows) {
        // Map each row to a promise that resolves to an object with countryCode and clicks
        const promises = popularCountriesData.rows.map(async (row) => {
          const countryCode = row.keys[0];
          const clicks = row.clicks;

          if (countryCode && clicks) {
            if (!countryClicksMap[countryCode]) {
              countryClicksMap[countryCode] = 0;
            }

            countryClicksMap[countryCode] += clicks;
          }

          return { countryCode, clicks };
        });

        // Use Promise.all to wait for all promises to resolve
        const countryClicksArray = await Promise.all(promises);

        // Sort the array in parallel
        const sortedCountryClicks = countryClicksArray.sort((a, b) => b.clicks - a.clicks);

        // Slice and set the result
        const top10CountryClicks = sortedCountryClicks.slice(0, 10);
        console.log('Sorted Country Clicks:', top10CountryClicks);
        setSortedCountryClicks(top10CountryClicks);
      }

      setLoading(false);
    } catch (error) {
      console.error(error);
      setClickData(0);
      setData([]);
      setads([]);
      setAdData(0);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const contextValue = {
    data,
    adData,
    clickData,
    ads,
    loading,
    monthlySum,
    CountryClicks
  };

  return <DataContext.Provider value={contextValue}>{children}</DataContext.Provider>;
};

export const useDataContext = () => {
  return useContext(DataContext);
};

DataProvider.propTypes = {
  children: PropTypes.node.isRequired
};
