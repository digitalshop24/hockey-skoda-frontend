'use strict';

import angular from 'angular';
import TeodorCtrl from './controller.js';
import TeodorService from './service.js';

export default angular.module('dashboard.teodor', [])
    .service('teodorService', TeodorService)
    .config(function ($stateProvider) {
        $stateProvider
            .state('dashboard.teodor', {
                template: require('./template.html'),
                url: '/teodor',
                controller: TeodorCtrl,
                controllerAs: 'ctrl',
                params: {
                    page: 1,
                    perPage: 1,
                    tag: '#хоккейвкаждом'
                },
                resolve: {

                    posts: ($stateParams, factService) => {
                        return factService.getFacts($stateParams.page, $stateParams.perPage, $stateParams.tag);
                    },

                    page: ($stateParams) => {
                        return $stateParams.page;
                    },

                    perPage: ($stateParams) => {
                        return $stateParams.perPage;
                    },

                    tag: ($stateParams) => {
                        return $stateParams.tag;
                    }
                }
            });
    });
