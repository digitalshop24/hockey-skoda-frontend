'use strict';

export default class ForecasttwoService {
    constructor(api) {
        this.api = api;
    }

    getClosestMatches() {
        return this.api.get('/predictions/closest_matches').then(res=> {
            return res.data;
        });
    }

    sendForecast(id, redScore, blueScore) {
        return this.api.post('/predictions/closest_matches',{
            match_id: id,
            redteam_score: redScore,
            blueteam_score: blueScore
        }).then(res=> {
            return res.data;
        });
    }
}
