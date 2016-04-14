'use strict';

import angular from 'angular';


export default angular.module('dashboard.rights', [])
    .config(function ($stateProvider) {
        $stateProvider
            .state('dashboard.rights', {
                template: require('./template.html'),
                url: '/rights'
            });
    });
