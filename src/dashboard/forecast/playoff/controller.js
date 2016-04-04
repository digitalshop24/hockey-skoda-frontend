'use strict';


export default class ForecastCtrl {
    constructor(table, modal) {
        this.table = table;
        this.teams = table.teams;
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
    }
}