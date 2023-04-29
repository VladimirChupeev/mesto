export default class UserInfo {
  constructor(
    { name, about, _id, avatar },
    { nameSelector, hobbySelector, avatarSelector }
  ) {
    this._name = name;
    this._hobby = about;
    this._id = _id;
    this._avatar = avatar;
    this._nameSelector = document.querySelector(nameSelector);
    this._hobbySelector = document.querySelector(hobbySelector);
    this._avatarSelector = document.querySelector(avatarSelector);
  }

  getUserInfo() {
    return {
      _name: this._name,
      _hobby: this._hobby,
      _avatar: this._avatar,
    };
  }

  setUserInfo(name, hobby) {
    this._name = name;
    this._hobby = hobby;
    this.fillProfileOnPage();
  }

  fillProfileOnPage() {
    this._nameSelector.textContent = this._name;
    this._hobbySelector.textContent = this._hobby;
  }

  updateAvatar(avatar) {
    this._avatarSelector.src = avatar;
  }

  getId() {
    return this._id;
  }
}
