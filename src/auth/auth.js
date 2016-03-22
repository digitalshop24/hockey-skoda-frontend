'use strict';

import angular from 'angular';
import config from './config';

export default class AuthService {
    constructor(api, session) {
        this.api = api;
        this.session = session;
    }

    register(credentials) {
        return this.api.post('/users', credentials).then(response => {
            this.session.token = response.data.user.authentication_token;
            this.session.user = Object.assign(this.session.user, response.data.user);
            return this.session;
        }).catch(response => {
            throw response.data.error;
        });
    }

    login(credentials) {
        return this.api.post('/users', credentials).then(response => {
            this.session.token = response.data.user.authentication_token;
            this.session.user = Object.assign(this.session.user, response.data.user);
            return this.session;
        }).catch(response => {
            throw response.data.error;
        });
    }

    isGuest(){
        return this.session.user.isGuest();
    }

    logout() {
        return this.api.post('/logout').then(response => {
            this.session.invalidate();
            return this.session;
        }).catch(response => {
            throw response.data.error;
        });
    }
}

