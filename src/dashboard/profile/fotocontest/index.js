'use strict';

import angular from 'angular';
import FotocontestCtrl from './controller.js';

export default angular.module('dashboard.profile.fotocontest', [])
    .config(function ($stateProvider) {
        $stateProvider
            .state('dashboard.profile.fotocontest', {
                template: require('./template.html'),
                url: '/fotocontest',
                controller: FotocontestCtrl,
                controllerAs: 'ctrl'
            });
    });
