import React, { createContext, useContext, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { getConsoleData, getAdCampaigns } from '../services';
const DataContext = createContext();

// Create a provider component to wrap your app and provide the context value
export const DataProvider = ({ children }) => {
  const [data, setData] = useState([]);
  const [adData, setAdData] = useState([]);
  const [clickData, setClickData] = useState([]);
  const [ads, setads] = useState([]);
  const [loading, setLoading] = useState(true);
  const [monthlySum, setMonthlySum] = useState([]);

  const fetchData = async () => {
    try {
      const [consoleData, adData] = await Promise.all([getConsoleData(), getAdCampaigns()]);
      const res = consoleData?.data;
      const res_2 = adData.data.campaigns.length;
      setData(res);
      setads(adData?.data);
      setAdData(res_2);
      if (res && res.search_analytics_data && res.search_analytics_data.rows) {
        const { rows } = res.search_analytics_data;
        const sum = rows.reduce(
          (acc, row) => {
            acc.clicks += row.clicks;
            acc.impressions += row.impressions;
            acc.ctr += row.ctr;
            return acc;
          },
          { clicks: 0, impressions: 0, ctr: 0 }
        );
        setClickData(sum.clicks);
        console.log('Sum of clicks:', sum.clicks);
        console.log('Sum of impressions:', sum.impressions);
        console.log('Sum of ctr:', sum.ctr);

        const currentDate = new Date();
        const currentMonth = currentDate.getMonth() + 1; // Months are zero-indexed, so add 1
        
        const monthNames = [
          "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
        ];
        
        const monthlySumData = rows.reduce((acc, row) => {
          const monthKey = row.keys[0].substring(0, 7); // Extract YYYY-MM format
          const date = new Date(monthKey);
        
          if (date >= new Date(currentDate.getFullYear() - 1, currentMonth - 1, 1)) {
            if (!acc[monthKey]) {
              acc[monthKey] = {
                clicks: 0,
                impressions: 0,
                ctr: 0,
                year: date.getFullYear(),
                month: date.getMonth() + 1,
                monthName: monthNames[date.getMonth()] // Add month name
              };
            }
        
            acc[monthKey].clicks += row.clicks;
            acc[monthKey].impressions += row.impressions;
            acc[monthKey].ctr += row.ctr;
          }
        
          return acc;
        }, {});
        
        console.log("monthly ", Object.values(monthlySumData));
        setMonthlySum(Object.values(monthlySumData));
        
      }

      setLoading(false);
    } catch (error) {
      console.error('Error fetching data:', error);
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
    monthlySum
  };

  return <DataContext.Provider value={contextValue}>{children}</DataContext.Provider>;
};

export const useDataContext = () => {
  return useContext(DataContext);
};

DataProvider.propTypes = {
  children: PropTypes.node.isRequired
};
