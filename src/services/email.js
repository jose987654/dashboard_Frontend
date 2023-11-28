import axios from 'axios';
import { baseUrl } from './index';
import { axiosConfig } from './user';
// function to get all email data
export async function getEmailList() {
  const data = await axios.get(`${baseUrl}/get_emails?_format=json`, axiosConfig).then(function (response) {
    const response_data = response;
    console.log(response_data);
    return response_data;
  });
  return data;
}

// function to update all email data
export async function updateEmail(payload) {
  const data = await axios.get(`${baseUrl}/update_email?_format=json`, payload, axiosConfig).then(function (response) {
    const response_data = response;
    console.log(response_data);
    return response_data;
  });
  return data;
}

// function to delete single email data
export async function deleteEmail(payload) {
  const data = await axios.post(`${baseUrl}/delete_email?_format=json`, payload, axiosConfig).then(function (response) {
    const response_data = response;
    console.log(response_data);
    return response_data;
  });
  return data;
}

// function to delete all email data
export async function deleteAllEmail() {
  const data = await axios.post(`${baseUrl}/delete_all_emails?_format=json`, axiosConfig).then(function (response) {
    const response_data = response;
    console.log(response_data);
    return response_data;
  });
  return data;
}
