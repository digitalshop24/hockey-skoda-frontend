'use strict';

import angular from 'angular';
import PhotocontestCtrl from './controller.js';
import PhotocontestService from './service.js';

export default angular.module('dashboard.photocontest', [])
    .service('generalPhotocontestService', PhotocontestService)
    .config(function ($stateProvider) {
        $stateProvider
            .state('dashboard.photocontest', {
                template: require('./template.html'),
                url: '/photocontest',
                controller: PhotocontestCtrl,
                controllerAs: 'ctrl',
                params: {
                    page: 1,
                    perPage: 15
                },
                resolve: {
                    photos: (generalPhotocontestService, $stateParams) => {
                        return generalPhotocontestService.getAllPhotos($stateParams.page, $stateParams.perPage);
                    },
                    currentPage: ($stateParams) => {
                        return $stateParams.page;
                    },
                    perPage: ($stateParams) => {
                        return $stateParams.perPage;
                    }
                }
            });
    });
