'use strict';

import angular from 'angular';
import CompanionshipCtrl from './controller.js';
import CompanionshipService from './service.js';
import spin from './spin.js';

export default angular.module('dashboard.forecast.companionship', [
    spin.name
])
    .service('companionshipService', CompanionshipService)
    .config(function ($stateProvider) {
        $stateProvider
            .state('dashboard.forecast.companionship', {
                meta: {
                    title: 'Самые разные хоккейные прогнозы. Ваше мнение?',
                    description: 'Любители хоккея, следите за нашими длительными прогнозами с сеткой на весь турнир, прогнозами на матчи, смешными прогнозами «на количество выбитых зубов»! За правильные прогнозы победители будут получать баллы для участия в розыгрышах призов.'
                },
                template: require('./template.html'),
                url: '/companionship',
                controller: CompanionshipCtrl,
                controllerAs: 'ctrl',
                resolve: {
                    matches: (companionshipService) => {
                        return companionshipService.getClosestMatches();
                    }
                }
            });
    });
