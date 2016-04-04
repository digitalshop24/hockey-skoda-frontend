'use strict';


export default class ForecastCtrl {
    constructor(table, modal) {
        this.table = table;
        this.teams = table.teams;
        this.teamsA = table[0].group_A;
        this.teamsB = table[1].group_B;
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