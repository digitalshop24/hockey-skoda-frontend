'use strict';

import angular from 'angular';
import ScoreCtrl from './controller.js';
import ScoreService from './service.js';

export default angular.module('dashboard.score', [])
    .service('scoreService', ScoreService)
    .config(function ($stateProvider) {
        $stateProvider
            .state('dashboard.score', {
                template: require('./template.html'),
                url: '/score',
                controller: ScoreCtrl,
                controllerAs: 'ctrl'
            });
    });
