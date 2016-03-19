'use strict';

import angular from 'angular';

export default angular.module('error-pages.external-server-error', [])
    .config($stateProvider => {
        $stateProvider.state('error-pages.external-server-error', {
            template: require('./template.jade'),
            url: '/error'
        });
    });