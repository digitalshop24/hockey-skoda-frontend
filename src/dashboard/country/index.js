'use strict';

import angular from 'angular';
import countryCtrl from './controller.js';

export default angular.module('dashboard.country', [])
    .config(function ($stateProvider) {
        $stateProvider
            .state('dashboard.country', {
                template: require('./template.html'),
                url: '/country',
                controller: countryCtrl,
                controllerAs: 'ctrl',
            });
    });