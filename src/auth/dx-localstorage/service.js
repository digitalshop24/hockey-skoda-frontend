'use strict';

import User from '../user';

export default class SkodaLocalStorage {
    constructor($localStorage) {
        this.localStorage = $localStorage.$default({
            user: new User(),
            isAuthenticated: false
        });

        this.user = this.localStorage.user;
        this.isAuthenticated = this.localStorage.isAuthenticated;
    }

    get isAuthenticated(){
        return this._isAuthenticated;
    }

    set isAuthenticated(value){
        this.localStorage.isAuthenticated = this._isAuthenticated = value;
    }

    get user(){
        return this._user;
    }

    set user(value){
        this.localStorage.user = this._user = Object.assign(new User(), value);
    }

    resetDefaults() {
        this.user = new User();
    }
}