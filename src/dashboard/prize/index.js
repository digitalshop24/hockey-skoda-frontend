'use strict';

import angular from 'angular';
import PrizeCtrl from './controller.js';
import PrizeService from './service.js';

export default angular.module('dashboard.prize', [])
    .service('prizeService', PrizeService)
    .config(function ($stateProvider) {
        $stateProvider
            .state('dashboard.prize', {
                template: require('./template.html'),
                url: '/prize',
                controller: PrizeCtrl,
                controllerAs: 'ctrl'
            });
    });
