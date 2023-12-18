// const ipAddress = '127.0.0.1:5000'; https://jon.seedr.dev/login
const ipAddress = '23.88.55.176:5000';
// const baseUrl = `https://${ipAddress}`;
const baseUrl = `https://jon.seedr.dev:5000`;

import { getEmailList, updateEmail, deleteEmail, deleteAllEmail, addEmailList, delEmailList } from './email';
import { loginFunction, signupFunction, resetPasswordFunction, logoutFunction, logoutFunctioncustom, statusFunction } from './user';
import { getAdCampaigns, getKeywords } from './Ads_data';
import { getConsoleData } from './console_data';

export {
  getEmailList,
  loginFunction,
  signupFunction,
  resetPasswordFunction,
  logoutFunction,
  statusFunction,
  logoutFunctioncustom,
  baseUrl,
  getKeywords,
  ipAddress,
  updateEmail,
  deleteEmail,
  deleteAllEmail,
  getAdCampaigns,
  getConsoleData,
  addEmailList,
  delEmailList
};
