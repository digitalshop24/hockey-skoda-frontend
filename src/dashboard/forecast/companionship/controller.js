'use strict';


export default class ForecasttwoCtrl {
    constructor(matches, companionshipService) {
        this.matches = matches.matches;
        this.userPredictions = matches.predictions;
        this.matches.forEach((match) => {
            match.redScore = 0;
            match.blueScore = 0;
            const id = match.id;
            const userPrediction = this.userPredictions.find(x => x.match.id == id);
            if(userPrediction) {
                match.redScore = userPrediction.redteam_score;
                match.blueScore = userPrediction.blueteam_score;
                match.isDisabled = true;
            }
        });
        this.service = companionshipService;
    }

    forecast(match) {
        match.isDisabled = true;
        this.service.sendForecast(match.id, match.redScore, match.blueScore);
    }
}