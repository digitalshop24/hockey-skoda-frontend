'use strict';

import angular from "angular";

export default angular.module('dashboard.prizenew.allprizes-slider-init', [])
    .directive('allPrizesSliderInit', function ($rootScope) {
        return {
            link: function () {
                angular.element(document).ready(function () {
                    alert('dsds');
                    $('.all-rizes-slider').slick({
                        slidesToShow : 4,
                        slidesToScroll : 4,
                        arrows : true
                    })
                });
            }
        }
    });