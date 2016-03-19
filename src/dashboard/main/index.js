'use strict';

import angular from 'angular';
import MainCtrl from './controller.js';
import MainService from './service.js';

export default angular.module('dashboard.main', [])
    .service('mainService', MainService)
    .config(function ($stateProvider) {
        $stateProvider
            .state('dashboard.main', {
                template: require('./template.html'),
                url: '/main',
                controller: MainCtrl,
                controllerAs: 'ctrl'
            });
    });
