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
            this.initSession(response);
            return this.session;
        }).catch(response => {
            throw response.data;
        });
    }

    login(credentials) {
        return this.api.post('/users/sign_in', credentials).then(response => {
            this.initSession(response);
            return this.session;
        }).catch(response => {
            throw response.data;
        });
    }

    initSession(response) {
        this.session.token = response.data.user.token;
        this.session.user = Object.assign(this.session.user, response.data.user);
        this.session.isAuthenticated = true;
    }

    isGuest(){
        return this.session.user.isGuest();
    }

    logout() {
        return this.api.delete('/users/sign_out').then(response => {
            this.session.invalidate();
            return this.session;
        }).catch(response => {
            throw response.data.error;
        });
    }
}

