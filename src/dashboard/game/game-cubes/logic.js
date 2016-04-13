'use strict';

import angular from "angular";

export default angular.module('dashboard.game.cubes.logic', [])
    .directive('cubesInit', function () {
        return {
            link: function () {

                angular.element(document).ready(() => {
                    $('.game-two-while .item').click(function() {
                        $(this).css('background', 'url(img/resources/img/icon-game/icon-led-while-tres.png)');
                    });
                    $('.game-two-green .item').click(function() {
                        $(this).css('background', 'url(img/resources/img/icon-game/icon-led-green-tres-1.png)');
                    });

                    $('.game-slider-for').slick({
                        infinite: true,
                        dots:false,
                        arrows:false,
                        centerMode: true,
                        focusOnSelect: true,
                        slidesToShow: 7,

                        slidesToScroll: 1,
                        asNavFor: '.game-slider-nav',
                    });
                    $('.game-slider-nav').slick({
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