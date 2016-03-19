'use strict';

const UNAUTHORIZED = 401;
const EXTERNAL_SERVER_ERROR = 500;

export default class Api {
    constructor($http, $state) {
        this.api = "http://skoda-hockey.herokuapp.com/api/v1";
        this.http = $http;
        this.state = $state;
    }

    get(url) {
        return this.http.get(this.api + url, {
            headers: this.headers
        }).catch(response => {
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
        return {};
    }

    isAuthorized(response) {
        return response.status !== UNAUTHORIZED;
    }

    isExternalServerError(response) {
        return response.status === EXTERNAL_SERVER_ERROR;
    }

    handleResponse(response) {
        if (!this.isAuthorized(response)) {
            return this.state.go('login');
        }

        if (this.isExternalServerError(response)) {
            return this.state.go('error-pages.external-server-error');
        }

        throw response;
    }
}

