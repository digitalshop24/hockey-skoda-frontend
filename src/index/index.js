'use strict';

import angular from 'angular';

export default angular.module('index',
    [])
    .config($stateProvider => {
        $stateProvider
            .state('index', {
                url: '/index-modules',
                template: require("./template.html")
            });
    });
