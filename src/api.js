'use strict';

const UNAUTHORIZED = 401;
const EXTERNAL_SERVER_ERROR = 500;

export default class Api {
    constructor($http, $state, session, login) {
        this.api = "http://skoda-hockey.herokuapp.com/api/v1";
        this.http = $http;
        this.state = $state;
        this.session = session;
    }

    get(url, config) {
        const configObj = Object.assign(config || {}, {headers: this.headers});
        return this.http.get(this.api + url, configObj).catch(response => {
            this.handleResponse(response);
        });
    }

    post(url, data) {
        return this.http.post(this.api + url, data, {
            headers: this.headers
        }).catch(response => {
            this.handleResponse(response);
        });
    }

    put(url, data) {
        return this.http.put(this.api + url, data, {
            headers: this.headers
        }).catch(response => {
            this.handleResponse(response);
        });
    }

    get headers() {
        return {'Auth-Token': this.session.token};
    }

    isAuthorized(response) {
        return response.status !== UNAUTHORIZED;
    }

    isExternalServerError(response) {
        return response.status === EXTERNAL_SERVER_ERROR;
    }

    handleResponse(response) {
        if (!this.isAuthorized(response)) {
            login.open();
            //this.state.go('dashboard.login', {message: response.data.error_message});
        }

        if (this.isExternalServerError(response)) {
            this.state.go('error-pages.external-server-error');
        }

        throw response;
    }
}

