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
}