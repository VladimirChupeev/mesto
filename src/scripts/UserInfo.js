export default class UserInfo{
    constructor({name, hobby}){
        this._name = name;
        this._hobby = hobby;

    }
    getUserInfo() {
        return {
            name: this._name,
            hobby: this._hobby
        }
    }

    setUserInfo(name,hobby){
        this._name = name;
        this._hobby = hobby;
    }
}