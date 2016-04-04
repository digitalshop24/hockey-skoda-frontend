'use strict';

import angular from 'angular';
import SuggestionsCtrl from './controller.js';
import SuggestionsService from './service.js';
import card from './card.js';

export default angular.module('dashboard.suggestions', [
    card.name
])
    .service('suggestionService', SuggestionsService)
    .config(function ($stateProvider) {
        $stateProvider
            .state('dashboard.suggestions', {
                template: require('./template.html'),
                url: '/suggestions',
                controller: SuggestionsCtrl,
                controllerAs: 'ctrl'
            });
    });
