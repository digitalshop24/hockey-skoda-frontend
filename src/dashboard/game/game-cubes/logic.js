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
                    $('.game-two-while .item.notCrashed').click(function() {
                        $(this).css('background', 'url(img/resources/img/icon-game/icon-led-while-tres.png)');
                    });
                    $('.game-two-green .item.notCrashed').click(function() {
                        $(this).css('background', 'url(img/resources/img/icon-game/icon-led-green-tres-1.png)');
                    });

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
                        slidesToShow: 7,
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