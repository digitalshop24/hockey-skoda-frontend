'use strict';

import angular from 'angular';
import RegistrationCtrl from './controller.js';
import RegistrationService from './service.js';


export default angular.module('dashboard.registration', [
])
    .service('regService', RegistrationService)
    .config(function ($stateProvider) {
        $stateProvider
            .state('dashboard.registration', {
                meta: {
                    title: 'Регистрируйтесь на сайте и получайте баллы!',
                    description: 'Чем больше граф вы заполните, тем больше у вас будет стартовых баллов. Ваши данные нужны, чтобы вы могли без проблем получать призы и подарки!'
                },
                template: require('./template.html'),
                url: '/registration',
                controller: RegistrationCtrl,
                controllerAs: 'ctrl',
                resolve: {
                    brands: regService => {
                        return regService.getBrands();
                    },

                    skodaCars: regService => {
                        return regService.getSkodaCars();
                    }
                }
            });
    });
