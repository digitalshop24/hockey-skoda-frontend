'use strict';

import angular from "angular";

export default angular.module('dashboard.spin', [])
    .directive('spin', function () {
        return {
            scope: {
                value: '=',
                disabled: '='
            },
            template: '<input type="text" name="spin" readonly ng-disabled="disabled">',
            link: function ($scope, element, attrs, controller) {

                let min, max, step, value, input, initial;

                element = angular.element(element);

                min = typeof attrs.min !== 'undefined' ? attrs.min : 0;
                max = typeof attrs.max !== 'undefined' ? attrs.max : 25;
                step = typeof attrs.step !== 'undefined' ? attrs.step : 1;

                initial = parseInt($scope.value);

                input = $("input[name='spin']", element);
                input.TouchSpin({
                    min: min,
                    max: max,
                    stepinterval: step,
                    initval: initial
                });

                input.on('change', function (e) {
                    $scope.value = input.val();

                    //hack
                    if (!$scope.$$phase) {
                        $scope.$apply();
                    }

                });


            }
        }
    });