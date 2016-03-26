'use strict';

import angular from "angular";

export default angular.module('dashboard.general-news.scroll', [])
    .directive('generalNewsScroll', function ($rootScope,generalNewsLogicService) {
        return {
            scope: {
                loadNext: '&',
                loadPrevious: '&'
            },
            link: function ($scope, $element, $attrs, controller) {

                angular.element(document).ready(() => {

                    $scope.$on('$destroy', function () {
                        $(document).off('scroll', handler);
                    });

                    let lastScrollTop = 0;
                    const handler = (event)=> {
                        if (isTimeline(event.target)) {
                            return;
                        }
                        let st = $(document).scrollTop();
                        const scrollDown = st >= lastScrollTop;

                        if (scrollDown) {
                            const needLoadNextDay = checkLoadNeeded();

                            if (needLoadNextDay) {
                                $scope.loadNext();
                            }
                        } else {
                            const needLoadPreviousDay = checkLoadPreviousDayNeeded();

                            if (needLoadPreviousDay) {
                                $scope.loadPrevious();
                            }
                        }


                        let activeDayChanged;
                        if (scrollDown) {
                            activeDayChanged = handleScrollDown();
                        } else if (st < lastScrollTop) {
                            activeDayChanged = handleScrollUp();
                        }
                        if (activeDayChanged) {
                            generalNewsLogicService.day = +currentActiveDay;
                            $rootScope.$broadcast('generalNews:activeDayChanged', {
                                day: currentActiveDay,
                                scrollDown: scrollDown
                            });
                        }
                        lastScrollTop = st;
                    };
                    $(document).on('scroll', handler);

                    $(document).trigger('scroll');

                    function checkLoadNeeded() {
                        const daysWithNews = $('#news').find('.row');
                        if (daysWithNews.length) {
                            return elementIntoTheView(daysWithNews[daysWithNews.length - 1]);
                        }
                        return false;
                    }

                    function checkLoadPreviousDayNeeded() {
                        const daysWithNews = $('#news').find('.row');
                        if (daysWithNews.length) {
                            return $(daysWithNews[0]).offset().top > $(window).scrollTop();
                        }
                        return false;
                    }

                    function elementIntoTheView(elem) {
                        const elementOffsetTop = $(elem).offset().top;
                        const elementHeight = $(elem).height();
                        const elementBottom = elementOffsetTop + elementHeight;

                        const windowBottom = $(window).scrollTop() + $(window).height();

                        return elementBottom < windowBottom + 100;
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