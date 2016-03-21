'use strict';

import angular from 'angular';
import BlogCtrl from './controller.js';
import BlogService from './service.js';

export default angular.module('dashboard.blog', [])
    .service('blogService', BlogService)
    .config(function ($stateProvider) {
        $stateProvider
            .state('dashboard.blog', {
                template: require('./template.html'),
                url: '/blog',
                controller: BlogCtrl,
                controllerAs: 'ctrl'
            });
    });
