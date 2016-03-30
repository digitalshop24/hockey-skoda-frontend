'use strict';

import angular from 'angular';
import StarsCtrl from './controller.js';
import StarsService from './service.js';

export default angular.module('dashboard.stars', [])
    .service('starsService', StarsService)
    .config(function ($stateProvider) {
        $stateProvider
            .state('dashboard.stars', {
                template: require('./template.html'),
                url: '/stars',
                controller: StarsCtrl,
                controllerAs: 'ctrl'
            });
    });
