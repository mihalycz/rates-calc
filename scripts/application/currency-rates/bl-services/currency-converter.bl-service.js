// currency converter service factory
(function () {

    'use strict';

    angular
        .module('currency.rates')
        .factory('currencyConverterBlService', ['latestRatesDataService', 'textConstants', 'dataConstants', '$q', '$timeout', currencyConverterBlService]);

    function currencyConverterBlService(latestRatesDataService, textConstants, dataConstants, $q, $timeout) {

        return {
            convert: convert
        };

        function convert(base, rate, value) {
            var deferred = $q.defer();

            $timeout(function () {
                if (dataConstants.SUPPORTED_CURRENCIES.indexOf(base) === -1) {
                    deferred.reject(textConstants.BASE_CURRENCY_NOT_SUPPORTED);
                }

                if (dataConstants.SUPPORTED_CURRENCIES.indexOf(rate) === -1) {
                    deferred.reject(textConstants.RATE_CURRENCY_NOT_SUPPORTED);
                }

                if (!value || typeof value !== 'number') {
                    deferred.reject(textConstants.WRONG_BASE_CURRENCY_VALUE);
                }

                latestRatesDataService.getRate(base).then(function (data) {
                    var rateValue = data['rates'][rate];
                    if (rateValue && typeof rateValue === 'number') {
                        deferred.resolve(rateValue * value);
                    } else {
                        deferred.reject(textConstants.RATE_CURRENCY_VALUE_NOT_FOUND);
                    }
                }, function (reason) {
                    deferred.reject(reason);
                });
            });

            return deferred.promise;
        }
    }

})();
