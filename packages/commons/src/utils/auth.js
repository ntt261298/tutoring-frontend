export default class Auth {
  constructor(storage, authKey = 'authentication') {
    this.storage = storage;
    this.authKey = authKey;
    this.data = this.storage.getJson(this.authKey);
    if (this.data) {
      this.storage.setCookie('Authorization', `Bearer ${this.data.accessToken}`);
    }
  }

  getToken() {
    return this.data?.accessToken;
  }

  isAuth() {
    return !!(this.getToken());
  }

  setAuth(data) {
    this.data = data;
    this.storage.setJson(this.authKey, data);
    this.storage.setCookie('Authorization', `Bearer ${this.data?.accessToken}`);
  }

  logout() {
    this.data = {};
    this.storage.removeItem(this.authKey);
    this.storage.removeCookie('Authorization');
  }
}
