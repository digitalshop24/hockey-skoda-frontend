'use strict';

import extend from 'extend';
import LoginCtrl from './controller.js';

export default class Login{
    constructor($modal) {
        this.modal = $modal;
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
        this.modal.open(options);
    }
}