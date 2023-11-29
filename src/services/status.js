// useTokenStatus.js
import { useState, useEffect } from 'react';
import axios from 'axios';
import { baseUrl } from '.';
import { axiosConfig } from './user';
import { logoutFunctioncustom } from './user';

const useTokenStatus = () => {
  const [tokenStatus, setTokenStatus] = useState(null);

  useEffect(() => {
    const checkTokenStatus = async () => {
      try {
        const response = await axios.get(`${baseUrl}/status`, axiosConfig);
        console.log('response', response);
        if (response.status === 200) {
          const result = response.data;
          setTokenStatus(result.status);
        } else {
          // Handle error response
          console.error('Error checking token status:', response.statusText);
          logoutFunctioncustom();
        }
      } catch (error) {
        // Handle network or other errors
        console.error('Error checking token status:', error);
        logoutFunctioncustom();
      }
    };

    // Call the function initially
    checkTokenStatus();

    // Set up an interval to call the function every 1 minute
    const intervalId = setInterval(checkTokenStatus, 60000);

    // Clean up the interval on component unmount
    return () => clearInterval(intervalId);
  }, []); // The empty dependency array ensures that this effect runs only once

  const navigateToLogin = () => {
    logoutFunctioncustom();
  };

  return { tokenStatus, navigateToLogin };
};

export default useTokenStatus;
