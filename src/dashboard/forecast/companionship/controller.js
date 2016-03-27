'use strict';


export default class ForecasttwoCtrl {
    constructor(matches) {
        this.matches = matches.matches;
    }

    forecast(match) {
        console.log(match);
    }
}