'use strict';

import angular from 'angular';
import PrizenewCtrl from './controller.js';
import PrizenewService from './service.js';

export default angular.module('dashboard.prizenew', [])
    .service('prizenewService', PrizenewService)
    .config(function ($stateProvider) {
        $stateProvider
            .state('dashboard.prizenew', {
                meta: {
                    title: 'Интересные конкурсы и призы для болельщиков',
                    description: 'Вы можете рассказать о призах, которые можно выиграть, своим друзьям, участвуя в огромном количестве интересных активностей на сайте.'
                },
                template: require('./template.html'),
                url: '/contests?id=',
                controller: PrizenewCtrl,
                controllerAs: 'ctrl',
                resolve: {
                    sponsors: (prizenewService) => {
                        return prizenewService.getPrizes();
                    },

                    id: $stateParams => {
                        return $stateParams.id;
                    }
                }
            });
    });
