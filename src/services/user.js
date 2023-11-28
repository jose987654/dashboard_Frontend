import axios from 'axios';
import { baseUrl } from '.';
// import React, { useEffect } from 'react';
import { toast } from 'react-toastify';

export const token = localStorage.getItem('access_token');
export const refresh_token = localStorage.getItem('refresh_token');
export const user_role = localStorage.getItem('user_role');
export const userID = localStorage.getItem('userID');
const user_id = { user_id: !isNaN(userID) ? Number(userID) : null };

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
  try {
    const response = await axios.post(`${baseUrl}/signup?_format=json`, Payload);
    console.log('SUCCESSFUL RESPONSE', response);
    toast.success('Sign up Succesful.', {
      position: toast.POSITION.TOP_RIGHT,
      autoClose: 1500
    });
    setTimeout(function () {
      window.location.href = '/login';
    }, 1300);
  } catch (err) {
    console.log('ERROR RESPONSE', err);
    toast.error('Signup Failed.', {
      position: toast.POSITION.TOP_RIGHT,
      autoClose: 3000
    });
    return err;
  }
}

export async function logoutFunction() {
  await axios
    .post(`${baseUrl}/logout`, user_id)
    .then(function (response) {
      console.log('succesful logout', response);
      localStorage.removeItem('access_token');
      localStorage.removeItem('refresh_token');
      localStorage.removeItem('user_role');
      localStorage.removeItem('user_role');
      toast.success('Logout Successful', {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 600
      });
      window.location.replace('/login');
    })
    .catch((err) => {
      console.log('ERROR RESPONSE', err);
      toast.error('Failed.', {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 3000
      });

      //   window.location.replace('/login');
    });
}
