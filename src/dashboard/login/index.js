'use strict';

import extend from 'extend';
import LoginCtrl from './controller.js';

export default class Login{
    constructor($modal, $rootScope) {
        this.modal = $modal;
        this.rootscope = $rootScope;
        this.default = {
            animation: true,
            controller: LoginCtrl,
            controllerAs: 'ctrl',
            resolve: {
                message: () => {
                    return '';
                }
            },
            template: require('./template.html'),
            windowClass: 'modal-window'
        };
    }

    open(options) {
        options = extend(this.default, options);
        const modalInstance = this.modal.open(options);
        modalInstance.result.finally( ()  => {
            this.rootscope.alreadyInLoginModal = false;
        });
    }
}