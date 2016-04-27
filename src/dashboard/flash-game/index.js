'use strict';

import angular from 'angular';
import FlashGameCtrl from './controller.js';
import FlashGameService from './service.js';
import game from './game.js';

export default angular.module('dashboard.flash-game', [
    game.name
])
    .service('flashGameService', FlashGameService)
    .config(function ($stateProvider) {
        $stateProvider
            .state('dashboard.flash-game', {
                meta: {
                    title: 'Аэрохоккей',
                    description: 'Аэрохоккей'
                },
                template: require('./template.html'),
                url: '/flash-game',
                controller: FlashGameCtrl,
                controllerAs: 'ctrl'
            });
    });
