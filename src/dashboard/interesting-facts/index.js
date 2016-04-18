'use strict';

import angular from 'angular';
import FactsCtrl from './controller.js';
import FactsService from './service.js';

export default angular.module('dashboard.facts', [])
    .service('factService', FactsService)
    .config(function ($stateProvider) {
        $stateProvider
            .state('dashboard.facts', {
                meta: {
                    title: 'Интересные факты для любителей хоккея',
                    description: 'Вы сможете узнать действительно яркие и до этого не привлекавшие много внимания факты, которые мы подбираем специально для знатоков хоккея.'
                },
                template: require('./template.html'),
                url: '/interesting-facts',
                controller: FactsCtrl,
                controllerAs: 'ctrl',
                params: {
                    notScrollToTop: false,
                    page: 1,
                    perPage: 3,
                    facts: []
                },
                resolve: {
                    facts: ($stateParams, factService) => {
                        return factService.getFacts($stateParams.page, $stateParams.perPage).then((res) =>{
                           /* res.posts = $stateParams.facts.concat(res.posts);*/
                            return res;
                        });
                    },
                    page: ($stateParams) => {
                        return $stateParams.page;
                    }
                }
            });
    });
