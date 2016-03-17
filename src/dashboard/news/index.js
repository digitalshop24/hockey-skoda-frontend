'use strict';

import angular from 'angular';
import NewsCtrl from './controller.js';

export default angular.module('dashboard.news', [])
    .config(function ($stateProvider) {
        $stateProvider
            .state('dashboard.news', {
                template: require('./template.html'),
                url: '/news',
                controller: NewsCtrl,
                controllerAs: 'ctrl'
            });
    });
