'use strict';

export default class TestDriveService {
    constructor(api) {
        this.api = api;
    }

    getCities() {
        return this.api.get('/testdrive/cities')
            .then(response => {
                return response.data;
            });
    }

    getCars() {
        return this.api.get('/testdrive/cars')
            .then(response => {
                return response.data;
            });
    }

    getDealers(cityId) {
        return this.api.get('/testdrive/dealers', {
                params: {
                    city_id: cityId
                }
            })
            .then(response => {
                return response.data;
            });
    }

    sendRequest(data) {
        return this.api.post('/testdrive', data)
            .catch(response => {
                throw response.data;
            });
    }
}
