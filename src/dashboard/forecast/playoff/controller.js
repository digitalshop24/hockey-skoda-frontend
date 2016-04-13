'use strict';


export default class ForecastCtrl {
    constructor(table, modal, forecastService) {
        this.table = table;
        this.service = forecastService;
        this.forecast = table.predictions;
        this.modal = modal;

        this.canSendForecast = false;
    }

    changeSelectTeam(match) {
        this.canSendForecast = match.blueteam && match.redteam;
        if(this.canSendForecast) {
            if(match.redteam.id == match.blueteam.id) {
                this.modal.open({
                    resolve: {
                        message: () => {
                            return '<h4 class = "modal-title">Нельзя выбрать 2 одинаковых команды!</h4>'
                        }
                    }
                });
                this.canSendForecast = false;
            }
        }
    }

    sendForecast() {
        const predictions = [];
        for (let matchType in this.forecast) {
            const match = this.forecast[matchType]
            if (!match.disabled && match.can_predict) {
                if (match.redteam && match.blueteam) {
                    match.redteam_id = match.redteam.id;
                    match.blueteam_id = match.blueteam.id;
                    predictions.push(match);
                }
            }
        }
        this.service.sendPredictions(predictions).then(res => {
            this.modal.open({
                resolve: {
                    message: () => {
                        return '<h4 class = "modal-title">Ваш прогноз успешно отправлен!</h4>'
                    }
                }
            });
        });

    }
}