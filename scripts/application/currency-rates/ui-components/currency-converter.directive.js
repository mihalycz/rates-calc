// currency converter main directive
(function () {
    'use strict';

    angular
        .module('currency.rates')
        .directive('currencyConverter', currencyConverter);

    function currencyConverter() {
        return {
            controller: 'CurrencyConverterController',
            restrict: 'E',
            templateUrl: 'currency-converter.directive.html'
        };
    }
})();