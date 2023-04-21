export default class UserInfo {
  constructor({ nameSelector, hobbySelector }) {
    this._name = document.querySelector(nameSelector).textContent;
    this._hobby = document.querySelector(hobbySelector).textContent;
  }

  getUserInfo() {
    return {
      name: this._name,
      hobby: this._hobby,
    };
  }

  setUserInfo(name, hobby) {
    this._name = name;
    this._hobby = hobby;
  }
}
