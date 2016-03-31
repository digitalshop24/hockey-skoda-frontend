'use strict';


export default class ForecasttwoCtrl {
    constructor(matches, companionshipService) {
        this.matches = matches.matches;
        this.userPredictions = matches.predictions;
        this.matches.forEach((match) => {
            match.redScore = 0;
            match.blueScore = 0;
        });
        if (this.userPredictions) {
            this.matches.forEach((match) => {
                const id = match.id;
                const userPrediction = this.userPredictions.find(x => x.match.id == id);
                if (userPrediction) {
                    match.redScore = userPrediction.redteam_score;
                    match.blueScore = userPrediction.blueteam_score;
                    match.isDisabled = true;
                }
            });
        }
        this.service = companionshipService;
    }

    forecast(match) {
        this.service.sendForecast(match.id, match.redScore, match.blueScore).
            then((res) => {
                match.isDisabled = true;
            });
    }
}