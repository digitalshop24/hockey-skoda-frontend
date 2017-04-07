 'use strict';

import angular from 'angular';
import JuniorCtrl from './controller.js';
import JuniorService from './service.js';



export default angular.module('dashboard.junior', [])
    .service('juniorService', JuniorService)
    .config(function ($stateProvider) {
        $stateProvider
            .state('dashboard.junior', {
                template: require('./template.html'),
                url: '/junior',
                controller: JuniorCtrl,
                controllerAs: 'ctrl',
                resolve : {
                    lastNews: ($stateParams, mainService) => {
                        return mainService.getLastNews('jihc', 1, 4, 'content_manager', null).then(res => res.posts);
                    },

                    galleries: (juniorService) => {
                        return juniorService.getGalleries();
                    }
                }
            });
    });
