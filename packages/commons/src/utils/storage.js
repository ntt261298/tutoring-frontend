import Cookies from 'js-cookie';

export default class Storage {
  constructor(prefix) {
    this.prefix = prefix;
  }

  getStorageKey = key => (`${this.prefix}.${key}`);

  getItem = key => localStorage.getItem(this.getStorageKey(key))

  setItem = (key, value) => localStorage.setItem(this.getStorageKey(key), value)

  removeItem = key => localStorage.removeItem(this.getStorageKey(key))

  getJson = (key) => {
    const value = this.getItem(key);
    try {
      return JSON.parse(value);
    } catch (error) {
      return value;
    }
  }

  setJson = (key, value) => this.setItem(key, JSON.stringify(value))

  setCookie = (key, value) => {
    Cookies.set(this.getStorageKey(key), value, { expires: 365, path: '/' });
  }

  getCookie = key => Cookies.get(this.getStorageKey(key));

  removeCookie = (key) => {
    Cookies.remove(this.getStorageKey(key), { path: '/' });
  }
}
