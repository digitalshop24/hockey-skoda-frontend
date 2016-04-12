'use strict';

import angular from 'angular';
import social from './social/index.js';

export default angular.module('dashboard.infographics', [])
    .config(function ($stateProvider) {
        $stateProvider
            .state('dashboard.infographics', {
                template: require('./template.html'),
                url: '/infographics'
            });
    });
