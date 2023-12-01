import axios from 'axios';
import { baseUrl } from './index';
import { axiosConfig } from './user';
// function to get all campaign data
export async function getConsoleData() {
  const data = await axios.get(`${baseUrl}/search_data?_format=json`, axiosConfig).then(function (response) {
    const response_data = response;
    console.log(response_data);
    return response_data;
  });
  return data;
}
