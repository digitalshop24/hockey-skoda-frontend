'use strict';

import angular from 'angular';
import RegsuccessCtrl from './controller.js';
import RegsuccessService from './service.js';

export default angular.module('dashboard.regsuccess', [])
    .service('regsuccessService', RegsuccessService)
    .config(function ($stateProvider) {
        $stateProvider
            .state('dashboard.regsuccess', {
                template: require('./template.html'),
                url: '/reg-success',
                controller: RegsuccessCtrl,
                controllerAs: 'ctrl'
            });
    });
