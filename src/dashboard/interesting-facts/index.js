'use strict';

import angular from 'angular';
import FactsCtrl from './controller.js';
import FactsService from './service.js';

export default angular.module('dashboard.facts', [])
    .service('factService', FactsService)
    .config(function ($stateProvider) {
        $stateProvider
            .state('dashboard.facts', {
                template: require('./template.html'),
                url: '/interesting-facts',
                controller: FactsCtrl,
                controllerAs: 'ctrl',
                params: {
                    notScrollToTop: false,
                    page: 1,
                    perPage: 15,
                    facts: []
                },
                resolve: {
                    factInfo: ($stateParams, factService) => {
                        return factService.getFacts($stateParams.page, $stateParams.perPage).then((res) =>{
                            res.posts = $stateParams.facts.concat(res.posts);
                            return res;
                        });
                    },
                    page: ($stateParams) => {
                        return $stateParams.page;
                    }
                }
            });
    });
