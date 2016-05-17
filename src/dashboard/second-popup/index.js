'use strict';

import angular from "angular";
import SecondPopupCtrl from './controller.js';


export default angular.module('dashboard.second-popup', [])
    .directive('secondPopup', function () {
        return {
            bindToController: true,
            template: require('./template.html'),
            controller: SecondPopupCtrl,
            controllerAs: 'ctrl'
        }
    });