'use strict';

import angular from 'angular';
import PrizenewCtrl from './controller.js';
import PrizenewService from './service.js';

export default angular.module('dashboard.prizenew', [])
    .service('prizenewService', PrizenewService)
    .config(function ($stateProvider) {
        $stateProvider
            .state('dashboard.prizenew', {
                template: require('./template.html'),
                url: '/prize-new',
                controller: PrizenewCtrl,
                controllerAs: 'ctrl'
            });
    });