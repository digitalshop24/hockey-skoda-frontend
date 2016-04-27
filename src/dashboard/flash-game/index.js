'use strict';

import angular from 'angular';
import FlashGameCtrl from './controller.js';
import FlashGameService from './service.js';
import game1 from './game1.js';
import game2 from './game2.js';
import game3 from './game3.js';

export default angular.module('dashboard.flash-game', [])
    .service('flashService', FlashGameService)
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
