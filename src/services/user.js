import axios from 'axios';
import { baseUrl } from '.';
// import React, { useEffect } from 'react';

export const token = localStorage.getItem('access_token');
export const refresh_token = localStorage.getItem('refresh_token');
export const user_role = localStorage.getItem('user_role');
export const userID = localStorage.getItem('userID');

export let axiosConfig = {
  headers: {
    Authorization: token
  }
};

// Login function
export async function loginFunction(loginPayload) {
  console.log('SUCCESSFUL RESPONSE loginPayload', loginPayload);
  try {
    const response = await axios.post(`${baseUrl}/login?_format=json`, loginPayload);
    console.log('SUCCESSFUL RESPONSE', response);
    const access_token = response?.data?.access_token;
    const refresh_token = response?.data?.refresh_token;
    const user_role = response?.data?.role?.[0];
    const userID = response?.data?.role?.[1];
    localStorage.setItem('access_token', access_token);
    localStorage.setItem('refresh_token', refresh_token);
    localStorage.setItem('user_role', user_role);
    localStorage.setItem('userID', userID);
    window.location.href = '/dashboard/default';
    // localStorage.setItem('sessionActive', true);
    // sessionStorage.setItem('user', user);

    // window.location.href = '/listing';

    // if (roleID === USER_TYPES.ESTATE_MANAGER && Agencytoken === 2) {
    //   window.location.href = '/agency';
    // } else {
    //   if (roleID === USER_TYPES.RENTER) {
    //     window.location.href = '/listing';
    //   } else {
    //     window.location.href = '/dashboard/default';
    //   }
    // }
  } catch (err) {
    console.log('ERROR RESPONSE', err);
    // toast.error('Login Failed.\nIncorrect Username Or Password.', {
    //   position: toast.POSITION.TOP_RIGHT,
    //   autoClose: 30000,
    // });
    return err;
  }
}
// Login function
export async function signupFunction(Payload) {
  console.log('SUCCESSFUL RESPONSE Payload', Payload);
  try {
    const response = await axios.post(`${baseUrl}/register?_format=json`, Payload);
    console.log('SUCCESSFUL RESPONSE', response);
  } catch (err) {
    console.log('ERROR RESPONSE', err);
    // toast.error('Login Failed.\nIncorrect Username Or Password.', {
    //   position: toast.POSITION.TOP_RIGHT,
    //   autoClose: 30000,
    // });
    return err;
  }
}

export async function logoutFunction() {
  await axios
    .post(`${baseUrl}/logout`, {
      headers: {
        'Content-Type': 'application/json'
        // 'X-CSRF-Token': csrf_token
      }
    })
    .then(function (response) {
      console.log(response);
      console.log('succesful logout');
      // localStorage.removeItem("sessionActive");
      sessionStorage.clear();
      // toast.success("Logout Successful", {
      //   position: toast.POSITION.TOP_RIGHT,
      //   autoClose: 600,
      // });
      window.location.replace('/login');
      // setTimeout(function () {}, 100);
    })
    .catch((err) => {
      console.log('ERROR RESPONSE', err);
      sessionStorage.clear();
      window.location.replace('/login');
    });
}