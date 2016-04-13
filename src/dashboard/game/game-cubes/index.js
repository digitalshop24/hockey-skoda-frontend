'use strict';

import angular from 'angular';
import logic from './logic.js';
import CubesCtrl from './controller.js';
import CubesService from './service.js';

export default angular.module('dashboard.game.cubes', [
    logic.name
])
    .service('cubesService', CubesService)
    .config(function ($stateProvider) {
        $stateProvider
            .state('dashboard.game.cubes', {
                template: require('./template.html'),
                url: '/game/sectors/:id',
                controller: CubesCtrl,
                controllerAs: 'ctrl',
                resolve: {
                    sector: ($stateParams, cubesService) => {
                        return cubesService.getSectorInfo($stateParams.id);
                    },

                    prizes: cubesService => {
                        return cubesService.getPrizes();
                    },

                    coupons: (session, mytestdriveService) => {
                        if (session.isAuthenticated) {
                            return mytestdriveService.getCoupons();
                        }
                        return [];
                    },

                    user: (session, profileService) => {
                        if (session.isAuthenticated) {
                            return profileService.getCurrentUser();
                        }
                        return {};
                    },

                    id: $stateParams => {
                        return $stateParams.id;
                    }
                }

            });
    });
