'use strict';


export default class ForecasttwoCtrl {
    constructor(matches, companionshipService, modalSpeed) {
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
        this.modalSpeed = modalSpeed;
    }

    forecast(match) {
        this.service.sendForecast(match.id, match.redScore, match.blueScore).
            then((res) => {
                match.isDisabled = true;
            });
    }
    openSpeed() {
        if(localStorage["modalSpeedCompanion"] == null){
            localStorage["modalSpeedCompanion"] = "showed";
            this.modalSpeed.open({
              resolve: {
                  message: () => {
                    var header = 'Делайте прогнозы и получайте баллы! ';
                    var text = 'На этой странице есть все ближайшие матчи, результат которых можно прогнозировать. Прогноз на каждый матч можно сделать только 1 раз. Вам необходимо выставить счет и нажать кнопку "Угадать". За прогноз счета в матче вам начисляются баллы. Если вы угадаете счет, то получите дополнительные бонусные баллы.';
                    var message = '<h2>' + header + '</h2><p>' + text + '</p>';
                    return message;
                  }
              },
              windowClass: 'modal-window modal-window_right',
            });
            return;
        }
    }
}