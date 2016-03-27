'use strict';

export default class ForecasttwoService {
    constructor(api) {
        this.api = api;
    }

    getClosestMatches() {
        return this.api.get('/predictions/closest_matches.json').then(res=> {
            return res.data;
        });
    }
}
