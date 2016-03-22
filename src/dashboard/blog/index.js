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
                controllerAs: 'ctrl',
                params: {
                    page: 1,
                    perPage: 10,
                    blogs: []
                },
                resolve: {
                    blogs: ($stateParams, blogService) => {
                        return blogService.getBlogs($stateParams.page, $stateParams.perPage)
                            .then((res) => {
                                return $stateParams.blogs.concat(res);
                            });
                    },
                    page: ($stateParams) => {
                        return $stateParams.page;
                    }
                }
            });
    });
