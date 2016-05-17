'use strict';

import angular from "angular";
import StartPopupCtrl from './controller.js';


export default angular.module('dashboard.start-popup', [])
    .directive('startPopup', function () {
        return {
            scope: {},
            bindToController: true,
            template: require('./template.html'),
            controller: StartPopupCtrl,
            controllerAs: 'ctrl'
        }
    });