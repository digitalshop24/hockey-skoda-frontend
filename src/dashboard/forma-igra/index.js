'use strict';

import angular from 'angular';
import FormaIgraCtrl from './controller.js';
import FormaIgraService from './service.js';


export default angular.module('dashboard.forma-igra', [

])
    .service('formaIgraService', FormaIgraService)
    .config(function ($stateProvider) {
        $stateProvider
            .state('dashboard.forma-igra', {
                meta: {
                    title: 'Регистрируйтесь на сайте и получайте баллы!',
                    description: 'Чем больше граф вы заполните, тем больше у вас будет стартовых баллов. Ваши данные нужны, чтобы вы могли без проблем получать призы и подарки!'
                },
                template: require('./template.html'),
                url: '/forma-igra',
                controller: FormaIgraCtrl,
                controllerAs: 'ctrl',
                resolve: {
                    matches: (formaIgraService, $stateParams) => {
                        return formaIgraService.getSchedule('future');
                    }
                }
            });
    });
