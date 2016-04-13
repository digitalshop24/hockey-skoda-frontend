'use strict';

export default class RegistrationService {
    constructor(api) {
        this.api = api;
    }

    getBrands() {
        return this.api.get('/cars/brands').then((res) => {
            return res.data;
        });
    }

    getSkodaCars() {
        return this.api.get('/cars/skoda-models').then((res) => {
            return res.data;
        });
    }
}
