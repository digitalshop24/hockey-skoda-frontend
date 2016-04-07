'use strict';


export default class ForecastCtrl {
    constructor(table, modal, forecastService) {
        this.table = table;
        this.service = forecastService;
        this.teams = table.teams;
        this.teamsA = table.group_A;
        this.teamsB = table.group_B;
        this.forecast = table.predictions;
        this.modal = modal;
    }

    sendForecast() {

        this.modal.open({
            resolve: {
                message: () => {
                    return '<h4 class = "modal-title">Ваш прогноз успешно отправлен!</h4>'
                }
            }
        });
        /*const predictions = [];
        for(let matchType in this.forecast) {
            const match = this.forecast[matchType]
            if(!match.disabled && match.can_predict) {
                if(match.red && match.blue) {
                    match.redteam_id = match.red.id;
                    match.blueteam_id = match.blue.id;
                    predictions.push(match);
                }
            }
        }*/
       /* this.service.sendPredictions([this.forecast.firstQuarter]).then(res => {
            this.modal.open({
                resolve: {
                    message: () => {
                        return '<h4 class = "modal-title">Ваш прогноз успешно отправлен!</h4>'
                    }
                }
            });
        }).catch(err => {
            this.modal.open({
                resolve: {
                    message: () => {
                        return '<h4 class = "modal-title">Ошибка!</h4>'
                    }
                }
            });
        });*/

    }
}