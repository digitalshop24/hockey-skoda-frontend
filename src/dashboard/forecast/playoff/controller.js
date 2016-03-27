'use strict';


export default class ForecastCtrl {
    constructor(table, $modal) {
        this.table = table;
        this.teams = table.teams;
        this.modal = $modal;
    }

    sendForecast() {
        console.log(this);
        this.modal.open({
            template: '<div class="modal-header ng-scope"><h4 class = "modal-title">Ваш прогноз успешно отправлен!</h4></div>',
            size: 'lg'
        });
    }
}