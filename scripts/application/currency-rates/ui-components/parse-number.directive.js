// float parse directive
(function () {
    'use strict';

    angular
        .module('currency.rates')
        .directive('parseNumber', parseNumber);

    function parseNumber() {
        return {
            require: 'ngModel',
            restrict: 'A',
            link: function (scope, elem, attrs, ctrl) {
                ctrl.$parsers.push(function (value) {
                    return parseFloat(value || '');
                });
            }
        };
    }
})();
