'use strict';

import angular from 'angular';


export default angular.module('dashboard.regulations', [])
    .config(function ($stateProvider) {
        $stateProvider
            .state('dashboard.regulations', {
                template: require('./template.html'),
                url: '/regulations'
            });
    });
