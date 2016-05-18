'use strict';

import angular from 'angular';
import ProgressCtrl from './controller.js';
import ProgressService from './service.js';

export default angular.module('dashboard.profile.progress', [])
    .service('progressService', ProgressService)
    .config(function ($stateProvider) {
        $stateProvider
            .state('dashboard.profile.progress', {
                template: require('./template.html'),
                url: '/progress',
                controller: ProgressCtrl,
                controllerAs: 'ctrl'
            });
    });
