import Cookies from 'js-cookie';
import { isServer } from '@/utils/server';

const getCookie = (key: string) => {
  if (isServer()) {
    throw new Error('getCookie should not be called on the server in CSR mode.');
  }
  return Cookies.get(key);
};

const setCookie = (key: string, value: string) => {
  if (isServer()) {
    throw new Error('setCookie should not be called on the server in CSR mode.');
  }
  Cookies.set(key, value);
};

const removeCookie = (key: string) => {
  if (isServer()) {
    throw new Error('removeCookie should not be called on the server in CSR mode.');
  }
  Cookies.remove(key);
};

const removeAllCookies = () => {
  if (isServer()) {
    throw new Error('removeAllCookies should not be called on the server in CSR mode.');
  }
  const allCookies = Cookies.get();
  for (const cookieName in allCookies) {
    Cookies.remove(cookieName);
  }
};

const getLocalStorage = (key: string) => {
  if (isServer()) {
    throw new Error('getLocalStorage should not be called on the server in CSR mode.');
  }
  return localStorage.getItem(key);
};

const setLocalStorage = (key: string, value: string) => {
  if (isServer()) {
    throw new Error('setLocalStorage should not be called on the server in CSR mode.');
  }
  localStorage.setItem(key, value);
};

const removeLocalStorage = (key: string) => {
  if (isServer()) {
    throw new Error('removeLocalStorage should not be called on the server in CSR mode.');
  }
  localStorage.removeItem(key);
};

const removeAllLocalStorage = () => {
  if (isServer()) {
    throw new Error('removeAllLocalStorage should not be called on the server in CSR mode.');
  }
  localStorage.clear();
};

const removeSessionStorage = (key: string) => {
  if (isServer()) {
    throw new Error('removeSessionStorage should not be called on the server in CSR mode.');
  }
  sessionStorage.removeItem(key);
};

export {
  getCookie,
  setCookie,
  removeCookie,
  removeAllCookies,
  getLocalStorage,
  setLocalStorage,
  removeLocalStorage,
  removeAllLocalStorage,
  removeSessionStorage,
};