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
                resolve: {
                    photos: (generalPhotocontestService) => {
                        return generalPhotocontestService.getAllPhotos();
                    },
                    perPage: ($stateParams) => {
                        return $stateParams.perPage;
                    }
                }
            });
    });
