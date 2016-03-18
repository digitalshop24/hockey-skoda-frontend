'use strict';

import angular from 'angular';

import index from './index/index';
import dashboard from './dashboard/index';
import Api from './api';


export default angular.module('app',
    [
        'ui.router',
        index.name,
        dashboard.name
    ])
    .service('api', Api)
    .config(($locationProvider) => {
        $locationProvider.html5Mode(true);
    });