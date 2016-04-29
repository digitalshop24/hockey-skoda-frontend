'use strict';

import angular from 'angular';
import PhotokonkursCtrl from './controller.js';
import PhotokonkursService from './service.js';

export default angular.module('dashboard.photokonkurs', [])
    .service('photokonkursService', PhotokonkursService)
    .config(function ($stateProvider) {
        $stateProvider
            .state('dashboard.photokonkurs', {
                template: require('./template.html'),
                url: '/photokonkurs',
                controller: PhotokonkursCtrl,
                controllerAs: 'ctrl',
                resolve: {
                    achieve: (session, hockeyGameService) => {
                        if(session.isAuthenticated) {
                            return hockeyGameService.getAchieve();
                        }
                        return {};
                    }
                }
            });
    });
