'use strict';

import angular from 'angular';
import logic from './logic.js';
import CubesCtrl from './controller.js';

export default angular.module('dashboard.game.cubes', [
    logic.name
])
    .config(function ($stateProvider) {
        $stateProvider
            .state('dashboard.game.cubes', {
                template: require('./template.html'),
                url: '/game/sectors/:id',
                controller: CubesCtrl,
                controllerAs: 'ctrl'
            });
    });
