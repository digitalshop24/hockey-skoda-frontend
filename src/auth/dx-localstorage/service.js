'use strict';

import User from '../user';

export default class SkodaLocalStorage {
    constructor($localStorage) {
        this.localStorage = $localStorage.$default({
            user: new User()
        });

        this.user = this.localStorage.user;
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