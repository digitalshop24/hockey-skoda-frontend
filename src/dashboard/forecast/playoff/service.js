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

    sendPredictions(predictions) {
        return this.api.post('/predictions/play_off', {
            predictions: predictions
        }).then(res=> {
            return res.data;
        });
    }
}
