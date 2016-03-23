'use strict';

const TOKEN_NAME = 'hockey-skoda-auth-token';

export default class Session {
    constructor($cookies, skodaLocalStorage) {
        this.cookies = $cookies;
        this.localStorage = skodaLocalStorage;

        /*  Cleaning up   */
        if (this.user && this.user.isGuest()) {
            this.cleanupCookies();
        }
    }

    cleanupCookies() {
        this.cookies.remove(TOKEN_NAME);
    }

    invalidate() {
        this.cookies.remove(TOKEN_NAME);
        this.localStorage.resetDefaults();
    }

    get token() {
        return this.cookies.get(TOKEN_NAME);
    }

    set token(value) {
        const now = new Date();

        // will store token for 1 month
        const exp = new Date(now.getFullYear(), now.getMonth() + 1, now.getDate());

        this.cookies.put(TOKEN_NAME, value, {
            expires: exp
        });
    }

    get user() {
        return this.localStorage.user;
    }

    set user(value) {
        this.localStorage.user = value;
    }

    get isAuthenticated() {
        return this.localStorage.isAuthenticated;
    }

    set isAuthenticated(value) {
        this.localStorage.isAuthenticated = value;
    }
}