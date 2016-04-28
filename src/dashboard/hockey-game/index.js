'use strict';

import angular from 'angular';
import HockeyGameCtrl from './controller.js';
import HockeyGameService from './service.js';

export default angular.module('dashboard.hockey-game', [])
    .service('hockeyGameService', HockeyGameService)
    .config(function ($stateProvider) {
        $stateProvider
            .state('dashboard.hockey-game', {
                template: require('./template.html'),
                url: '/hockey-game',
                controller: HockeyGameCtrl,
                controllerAs: 'ctrl',
                resolve: {
                    achieve: (session, hockeyGameService) => {
                        if(session.isAuthenticated) {
                            return hockeyGameService.getAchieve();
                        }
                        return {};
                    }
                }
            });
    });
