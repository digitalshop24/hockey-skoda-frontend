'use strict';


export default class ForecasttwoCtrl {
    constructor(matches, companionshipService) {
        this.matches = matches.matches;
        this.service = companionshipService;
    }

    forecast(match) {
        match.isDisabled = true;
        this.service.sendForecast(match.id, match.redScore, match.blueScore);
    }
}