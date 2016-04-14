'use strict';

import angular from 'angular';
import EditCtrl from './controller.js';
import EditService from './service.js';


export default angular.module('dashboard.edit', [
])
    .service('editService', EditService)
    .config(function ($stateProvider) {
        $stateProvider
            .state('dashboard.edit', {
                meta: {
                    title: 'Регистрируйтесь на сайте и получайте баллы!',
                    description: 'Чем больше граф вы заполните, тем больше у вас будет стартовых баллов. Ваши данные нужны, чтобы вы могли без проблем получать призы и подарки!'
                },
                template: require('./template.html'),
                access: {
                    requiresLogin: true
                },
                url: '/edit',
                controller: EditCtrl,
                controllerAs: 'ctrl',
                resolve: {
                    brands: regService => {
                        return regService.getBrands();
                    },

                    skodaCars: regService => {
                        return regService.getSkodaCars();
                    },

                    user: (profileService) => {
                        return profileService.getCurrentUser();
                    }
                }
            });
    });
