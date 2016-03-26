'use strict';

import angular from 'angular';
import playoff from './playoff/index';
import companionship from './companionship/index';

export default angular.module('dashboard.forecast', [
    playoff.name,
    companionship.name
])
    .config(function ($stateProvider) {
        $stateProvider
            .state('dashboard.forecast', {
                template: require('./template.html'),
                url: '/forecast',
                abstract: true
            });
    });
