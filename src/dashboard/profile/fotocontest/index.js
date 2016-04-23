'use strict';

import angular from 'angular';
import FotocontestCtrl from './controller.js';
import FotocontestService from './service.js';

export default angular.module('dashboard.profile.fotocontest', [])
    .service('photocontestService', FotocontestService)
    .config(function ($stateProvider) {
        $stateProvider
            .state('dashboard.profile.fotocontest', {
                meta: {
                    title: 'Skoda Фотоконкурс',
                    description: ''
                },
                template: require('./template.html'),
                url: '/fotocontest',
                controller: FotocontestCtrl,
                controllerAs: 'ctrl',
                resolve: {
                    photos: photocontestService => {
                        return photocontestService.getMyPhotos();
                    }
                }
            });
    });
