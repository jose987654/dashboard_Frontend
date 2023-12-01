// backend address 23.88.55.176:5000 127.0.0.1:5000
const ipAddress = '127.0.0.1:5000';
const baseUrl = `http://${ipAddress}`;

import { getEmailList, updateEmail, deleteEmail, deleteAllEmail } from './email';
import {
  loginFunction,
  axiosConfig,
  signupFunction,
  resetPasswordFunction,
  logoutFunction,
  logoutFunctioncustom,
  statusFunction
} from './user';
import useTokenStatus from './status';
import { getAdCampaigns } from './Ads_data';

export {
  getEmailList,
  loginFunction,
  signupFunction,
  axiosConfig,
  resetPasswordFunction,
  logoutFunction,
  statusFunction,
  logoutFunctioncustom,
  baseUrl,
  ipAddress,
  updateEmail,
  deleteEmail,
  deleteAllEmail,
  useTokenStatus,
  getAdCampaigns
};
