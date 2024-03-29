'use strict';

import config from './config.json';

const roles = config.roles;

export default class User {
    constructor() {
        this.role = roles.guest;
    }

    isGuest(){
        return this.role === roles.guest;
    }

    get name() {
        const lastNameAndFirstName = ((this.last_name || '') + " " + (this.first_name || '')).trim();
        return lastNameAndFirstName ? lastNameAndFirstName : (this.nickname ? this.nickname : this.email);
    }
}