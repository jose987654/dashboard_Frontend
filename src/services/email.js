import axios from 'axios';
import { baseUrl } from './index';

// function to get all email data
export async function getEmailList() {
  const data = await axios.get(`${baseUrl}/get_emails?_format=json`).then(function (response) {
    const raw_property_data = response;
    console.log(raw_property_data);
    return raw_property_data;
  });
  return data;
}
