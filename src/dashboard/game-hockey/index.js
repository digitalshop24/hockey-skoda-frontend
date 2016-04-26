'use strict';

import angular from 'angular';
import GamehockeyCtrl from './controller.js';
import GamehockeyService from './service.js';



export default angular.module('dashboard.game-hockey', [])
    .service('game-hockeyService', GamehockeyService)
    .config(function ($stateProvider) {
        $stateProvider
            .state('dashboard.game-hockey', {
                template: require('./template.html'),
                url: '/game-hockey',
                controller: GamehockeyCtrl,
                controllerAs: 'ctrl',
                resolve: {
                    token: ($stateParams) => {
                        return $stateParams.reset_password_token;
                    }
                }
            });
    });
