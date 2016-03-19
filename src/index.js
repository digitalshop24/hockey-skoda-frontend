'use strict';

import angular from 'angular';

import index from './index/index';
import dashboard from './dashboard/index';
import Api from './api';
import errorPages from './error-pages/index';


export default angular.module('app',
    [
        'ui.router',
        'ui.bootstrap',
        errorPages.name,
        index.name,
        dashboard.name
    ])
    .service('api', Api)
    .config(($locationProvider) => {
        $locationProvider.html5Mode(true);
    })
    .run(($rootScope) => {

        $rootScope.$on('$stateChangeError', (err) => {
            console.log("error !!!");
        });
    });