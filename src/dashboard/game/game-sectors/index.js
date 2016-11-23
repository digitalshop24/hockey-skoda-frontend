'use strict';

import angular from 'angular';
import SectorsCtrl from './controller.js';


export default angular.module('dashboard.game.sectors', [])
    .config(function ($stateProvider) {
        $stateProvider
            .state('dashboard.game.sectors', {
                template: require('./template.html'),
                url: '/game/sectors',
                controller: SectorsCtrl,
                controllerAs: 'ctrl'
            });
    });
