'use strict';

import angular from "angular";
import StartPopupCtrl from './controller.js';


export default angular.module('dashboard.second-popup', [])
    .directive('startPopup', function () {
        return {
            bindToController: true,
            template: require('./template.html'),
            controller: SecondPopupCtrl,
            controllerAs: 'ctrl'
        }
    });