'use strict';

import angular from "angular";

export default angular.module('dashboard.slider-init', [])
    .directive('sliderInit', function (moment) {
        return {
            link: function () {
                angular.element(document).ready(function () {
                    initSlider();
                });
            }
        }
    });