'use strict';

import angular from 'angular';
import mobileappCtrl from './controller.js';

export default angular.module('dashboard.mobileapp', [])
    .config(function ($stateProvider) {
        $stateProvider
            .state('dashboard.mobileapp', {
                template: require('./template.html'),
                url: '/mobile',
                controller: mobileappCtrl,
                controllerAs: 'ctrl',
            });
    });