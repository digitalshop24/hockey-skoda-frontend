'use strict';

import angular from 'angular';
import SupergameCtrl from './controller.js';

export default angular.module('dashboard.profile.supergame', [])
    .config(function ($stateProvider) {
        $stateProvider
            .state('dashboard.profile.supergame', {
                template: require('./template.html'),
                url: '/supergame',
                controller: SupergameCtrl,
                controllerAs: 'ctrl'
            });
    });
