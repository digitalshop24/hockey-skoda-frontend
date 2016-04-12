'use strict';

import angular from 'angular';
import ForecastCtrl from './controller.js';
import ForecastService from './service.js';

export default angular.module('dashboard.forecast.playoff', [])
    .service('forecastService', ForecastService)
    .config(function ($stateProvider) {
        $stateProvider
            .state('dashboard.forecast.playoff', {
                meta: {
                    title: 'Самые разные хоккейные прогнозы. Ваше мнение?',
                    description: 'Любители хоккея, следите за нашими длительными прогнозами с сеткой на весь турнир, прогнозами на матчи, смешными прогнозами «на количество выбитых зубов»! За правильные прогнозы победители будут получать баллы для участия в розыгрышах призов.'
                },
                template: require('./template.html'),
                url: '',
                controller: ForecastCtrl,
                controllerAs: 'ctrl',
                resolve: {
                    table: (forecastService) => {
                        return forecastService.getTable();
                    }
                }
            });
    });
