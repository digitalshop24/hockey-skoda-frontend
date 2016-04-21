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
                url: '/interesting-facts/:id',
                controller: FactsCtrl,
                controllerAs: 'ctrl',
                params: {
                    page: 1,
                    perPage: 1,
                    facts: [],
                    tag: '#хоккейныйфакт'
                },
                resolve: {
                    facts: ($stateParams, factService) => {
                        return factService.getFacts($stateParams.page, $stateParams.perPage, $stateParams.tag).then((res) =>{
                            return res;
                        });
                    },
                    page: ($stateParams) => {
                        return $stateParams.page;
                    },
                    id: ($stateParams) => {
                        return $stateParams.id;
                    },
                    tag: ($stateParams) => {
                        return $stateParams.tag;
                    }
                }
            });
    });
