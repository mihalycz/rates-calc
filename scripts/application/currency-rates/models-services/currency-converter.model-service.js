//conversion  model factory
(function () {

    'use strict';

    angular
        .module('currency.rates')
        .factory('currencyConverterModelService', ['conversionTypesBlService', currencyConverterModelService]);

    function currencyConverterModelService(conversionTypesBlService) {

        var conversionTypes = conversionTypesBlService.getConversionTypes();

        return {
            // conversion types array
            conversionTypes: conversionTypes,
            // base currency value
            baseCurrencyValue: null,
            // current conversion type
            conversionType: conversionTypes.length ? conversionTypes[0] : null,
            // conversion result
            result: 0
        };
    }

})();

