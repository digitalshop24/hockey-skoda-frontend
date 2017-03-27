'use strict';

import angular from 'angular';
import FormaMasterClassCtrl from './controller.js';
import FormaMasterClassService from './service.js';


export default angular.module('dashboard.forma-master-class', [

])
    .service('formaMasterClassService', FormaMasterClassService)
    .config(function ($stateProvider) {
        $stateProvider
            .state('dashboard.forma-master-class', {
                meta: {
                    title: 'Регистрируйтесь на сайте и получайте баллы!',
                    description: 'Чем больше граф вы заполните, тем больше у вас будет стартовых баллов. Ваши данные нужны, чтобы вы могли без проблем получать призы и подарки!'
                },
                template: require('./template.html'),
                url: '/master-class',
                controller: FormaMasterClassCtrl,
                controllerAs: 'ctrl',
                resolve: {
                    moscowUsers: (formaMasterClassService, $stateParams) => {
                        return formaMasterClassService.getMoscowCount();
                    }
                }
            });
    });
