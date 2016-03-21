'use strict';

import angular from "angular";

export default angular.module('dashboard.general-news.scroll', [])
    .directive('generalNewsScroll', function ($rootScope) {
        return {
            scope: {
                loadNext: '&'
            },
            link: function ($scope, $element, $attrs, controller) {

                angular.element(document).ready(() => {

                    let lastScrollTop = 0;
                    $(document).on('scroll', (event)=> {
                        if (isTimeline(event.target)) {
                            return;
                        }

                        const needLoadNextDay = checkLoadNeeded();

                        if (needLoadNextDay) {
                            $scope.loadNext();
                        }

                        let st = $(document).scrollTop();
                        let activeDayChanged;
                        if (st > lastScrollTop) {
                            activeDayChanged = handleScrollDown();
                        } else if (st < lastScrollTop) {
                            activeDayChanged = handleScrollUp();
                        }
                        if (activeDayChanged) {
                            $rootScope.$emit('generalNews:activeDayChanged', currentActiveDay);
                        }
                        lastScrollTop = st;
                    });

                    $(document).trigger('scroll');

                    function checkLoadNeeded() {
                        const daysWithNews = $($element).find('.row');
                        if (daysWithNews.length) {
                            return elementIntoTheView(daysWithNews[daysWithNews.length - 1]);
                        }
                        return false;
                    }

                    function elementIntoTheView(elem) {
                        const elementOffsetTop = $(elem).offset().top;
                        const elementHeight = $(elem).height();
                        const elementBottom = elementOffsetTop + elementHeight;

                        const windowBottom = $(window).scrollTop() + $(window).height();

                        return elementBottom < windowBottom;
                    }

                    let currentActiveDay;
                    let newActiveDay;

                    function handleScrollDown() {
                        const daysWithNews = $($element).find('.row');

                        daysWithNews.each((index) => {
                            const day = daysWithNews.get(index);
                            const elementOffsetTop = $(day).offset().top;
                            const windowMiddle = $(window).scrollTop() + $(window).height() / 2;
                            if (elementOffsetTop < windowMiddle) {
                                newActiveDay = $(day).data("dayId");
                            }
                        });

                        let activeDayChanged = false;
                        if (currentActiveDay != newActiveDay) {
                            currentActiveDay = newActiveDay;
                            activeDayChanged = true;
                        }
                        return activeDayChanged;
                    }

                    function handleScrollUp() {
                        const daysWithNews = $($($element).find('.row').get().reverse());

                        daysWithNews.each((index) => {
                            const day = daysWithNews.get(index);
                            const elementOffsetBottom = $(day).offset().top + $(day).height();
                            const windowMiddle = $(window).scrollTop() + $(window).height() / 2;
                            if (elementOffsetBottom > windowMiddle) {
                                newActiveDay = $(day).data("dayId");
                            }
                        });
                        let activeDayChanged = false;
                        if (currentActiveDay != newActiveDay) {
                            currentActiveDay = newActiveDay;
                            activeDayChanged = true;
                        }
                        return activeDayChanged;
                    }

                    function isTimeline(target) {
                        return target.id == "timeline_wrapp";
                    }

                });


            }
        }
    });