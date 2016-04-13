'use strict';

import angular from 'angular';
import GameService from './service.js';
import sectors from './game-sectors/index.js';
import cubes from './game-cubes/index.js';

export default angular.module('dashboard.game', [
    sectors.name,
    cubes.name
])
    .service('gameService', GameService)
    .config(function ($stateProvider) {
        $stateProvider
            .state('dashboard.game', {
                template: require('./template.html'),
                abstract: true,
                resolve: {
                    sectors: gameService => {
                        return gameService.getSectors();
                    }
                }
            });
    });
