'use strict';

import angular from 'angular';

import index from './index/index';
import dashboard from './dashboard/index';


export default angular.module('app',
    [
        'ui.router',
        index.name,
        dashboard.name
    ])
    .config(($locationProvider) => {
        $locationProvider.html5Mode(true);
    });