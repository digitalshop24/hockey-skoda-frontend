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
                meta: {
                    title: 'Ваши добрые слова для нашей сборной',
                    description: 'Оставьте пожелания успеха нашей сборной в грядущем соревновании! Это не только шанс поучаствовать в возможном успехе команды, но и возможность проявить свои творческие способности.'
                },
                template: require('./template.html'),
                url: '/suggestions',
                controller: SuggestionsCtrl,
                controllerAs: 'ctrl'
            });
    });
