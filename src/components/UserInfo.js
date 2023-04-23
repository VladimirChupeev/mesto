export default class UserInfo {
  constructor({ nameSelector, hobbySelector }) {
    this._name = document.querySelector(nameSelector);
    this._hobby = document.querySelector(hobbySelector);
  }

  getUserInfo() {
    return {
      _name: this._name.textContent,
      _hobby: this._hobby.textContent,
    };
  }

  setUserInfo(name, hobby) {
    this._name.textContent = name;
    this._hobby.textContent = hobby;
  }
}