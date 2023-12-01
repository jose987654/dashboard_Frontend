import axios from 'axios';
import { baseUrl } from './index';
import { axiosConfig } from './user';
// function to get all email data
export async function getAdCampaigns() {
  const data = await axios.get(`${baseUrl}/ad_data?_format=json`, axiosConfig).then(function (response) {
    const response_data = response;
    console.log(response_data);
    return response_data;
  });
  return data;
}
