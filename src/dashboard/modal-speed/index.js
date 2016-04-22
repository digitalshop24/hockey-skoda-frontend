'use strict';

import ModalCtrl from './controller.js';

export default class Modal {
    constructor($modal) {
        this.modal = $modal;
        this.default = {
            animation: true,
            controller: ModalCtrl,
            controllerAs: 'ctrl',
            resolve: {
                message: () => {
                    return ""
                }
            },
            template: require('./template.html'),
            windowClass: 'modal-window'
        };
    }

    open(options) {
        options = Object.assign(this.default, options);
        this.modal.open(options);
    }
}
