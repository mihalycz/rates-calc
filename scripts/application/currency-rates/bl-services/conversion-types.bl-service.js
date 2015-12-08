// conversation types service factory
(function () {

    'use strict';

    angular
        .module('currency.rates')
        .factory('conversionTypesBlService', ['dataConstants', conversionTypesBlService]);

    function conversionTypesBlService(dataConstants) {

        return {
            getConversionTypes: getConversionTypes
        };

        function getConversionTypes() {
            var supportedCurrencies =  dataConstants.SUPPORTED_CURRENCIES,
                supportedCurrenciesLen = supportedCurrencies.length,
                result = [],
                baseCurrencyName,
                convertToCurrencyName;
            if (supportedCurrenciesLen) {
                for (var i = 0; i < supportedCurrenciesLen; i += 1) {
                    baseCurrencyName = supportedCurrencies[i];
                    if (typeof baseCurrencyName === "string" && baseCurrencyName) {
                        for (var j = 0; j < supportedCurrenciesLen; j += 1) {
                            convertToCurrencyName = supportedCurrencies[j];
                            if (typeof convertToCurrencyName === "string" && convertToCurrencyName && convertToCurrencyName.toLowerCase() !== baseCurrencyName.toLowerCase()) {
                                result.push({
                                    name: baseCurrencyName + '>' + convertToCurrencyName,
                                    base: baseCurrencyName,
                                    into: convertToCurrencyName
                                })
                            }
                        }
                    }
                }
            }
            return result;
        }
    }

})();
