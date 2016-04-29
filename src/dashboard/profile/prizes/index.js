'use strict';

import angular from 'angular';
import PrizesCtrl from './controller.js';
import PrizesService from './service.js';

export default angular.module('dashboard.profile.prizes', [])
    .service('prizesService',PrizesService)
    .config(function ($stateProvider) {
        $stateProvider
            .state('dashboard.profile.prizes', {
                template: require('./template.html'),
                url: '/my-prizes',
                controller: PrizesCtrl,
                controllerAs: 'ctrl',
                resolve: {
                    prizes: prizesService => {
                        return prizesService.getPrizes();
                    },

                    cities: tdriveService => {
                        return tdriveService.getCities();
                    }
                }
            });
    });
