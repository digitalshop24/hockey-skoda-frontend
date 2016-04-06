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