'use strict';

import angular from "angular";

export default angular.module('dashboard.game.cubes.logic', [])
    .directive('cubesInit', function () {
        return {
            scope: {
                initialSlide: '='
            }, 

            link: function ($scope) { 

                angular.element(document).ready(() => {

                    $('.priz-slider1').slick({
                        infinite: true,
                        slidesToShow: 1,
                        arrows:false,
                        dots: true,
                        slidesToScroll: 1
                    });

                    $('.game-slider-for').slick({
                        infinite: true,
                        dots:false,
                        arrows:false,
                        initialSlide: +$scope.initialSlide - 1,
                        centerMode: true,
                        focusOnSelect: true,
                        slidesToShow: 3,
                        slidesToScroll: 1,
                        asNavFor: '.game-slider-nav',
                    });
                    $('.game-slider-nav').slick({
                        initialSlide: +$scope.initialSlide - 1,
                        slidesToShow: 1,
                        slidesToScroll: 1,
                        dots: false,
                        focusOnSelect: true,
                        arrows: true,
                        asNavFor: '.game-slider-for'
                    });
                });
            }
        }
    });