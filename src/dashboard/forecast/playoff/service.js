'use strict';

export default class ForecastService {
    constructor(api) {
        this.api = api;
    }

    getTable() {
        return this.api.get('/predictions/play_off').then(res=> {
            return res.data;
        });
    }
}
