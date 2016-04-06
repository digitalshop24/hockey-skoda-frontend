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
                url: '/blog?hashtags',
                controller: BlogCtrl,
                controllerAs: 'ctrl',
                params: {
                    notScrollToTop: false,
                    page: 1,
                    perPage: 10,
                    blogs: [],
                    tags: [],
                    tagFilter: false
                },
                resolve: {
                    blogsInfo: ($stateParams, blogService) => {
                        if($stateParams.hashtags) {
                            $stateParams.tags = $stateParams.hashtags.split(',');
                        }
                        return blogService.getBlogs($stateParams.page, $stateParams.perPage, $stateParams.tags)
                            .then((res) => {
                                const blogs = $stateParams.tagFilter ? [] : $stateParams.blogs;
                                res.posts = blogs.concat(res.posts);
                                return res;
                            });
                    },
                    page: ($stateParams) => {
                        return $stateParams.page;
                    },
                    tags: ($stateParams) => {
                        return $stateParams.tags;
                    }
                }
            });
    });
