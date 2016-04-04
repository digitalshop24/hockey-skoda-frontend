'use strict';

import angular from 'angular';
import CheerCtrl from './controller.js';
import CheerService from './service.js';

export default angular.module('dashboard.cheer', [])
    .service('cheerService', CheerService)
    .config(function ($stateProvider) {
        $stateProvider
            .state('dashboard.cheer', {
                template: require('./template.html'),
                url: '/cheerleaders',
                controller: CheerCtrl,
                controllerAs: 'ctrl'
            });
    });
