'use strict';

import angular from "angular";
import ShareCtrl from './controller.js';


export default angular.module('dashboard.share.buttons', [])
    .directive('shareButtons', function () {
        return {
            scope: {
                data: '='
            },
            bindToController: true,
            template: require('./template.html'),
            controller: ShareCtrl,
            controllerAs: 'ctrl'
        }
    });