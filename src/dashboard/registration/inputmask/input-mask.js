'use strict';

import angular from "angular";

export default angular.module('dashboard.registration.input-mask-init', [])
    .directive('inputMaskInit', function () {
        return {
            link: function ($scope) {
                angular.element(document).ready(function () {
                  $(".phone-mask").mask("+7(999) 999-99-99");
                });
        }
    }
});
