'use strict';

import angular from 'angular';

export default angular.module('dashboard.infographics', [])
    .config(function ($stateProvider) {
        $stateProvider
            .state('dashboard.infographics', {
                meta: {
                    title: 'История хоккея в крутой инфографике',
                    description: 'Уделите внимание красивой инфографике успехов нашей команды за всю историю хоккея!'
                },
                template: require('./template.html'),
                url: '/infographics'
            });
    });
