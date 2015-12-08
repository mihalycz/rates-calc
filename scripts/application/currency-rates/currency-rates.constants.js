(function () {

    'use strict';

    var dataServicesConstants = {
        PATH_TO_LATEST_RATES: 'http://api.fixer.io/latest?callback=JSON_CALLBACK'
    };

    var textConstants = {
        FIXER_SERVER_ERROR: "There is a server error occurred during an attempt to get the rates.",
        NO_DATA_ERROR: 'No data received.',
        BASE_CURRENCY_NOT_SUPPORTED: 'Base currency is not supported.',
        RATE_CURRENCY_NOT_SUPPORTED: 'Rate currency is not supported.',
        WRONG_BASE_CURRENCY_VALUE: 'Base currency value is not set.',
        RATE_CURRENCY_VALUE_NOT_FOUND: 'Rate currency value is not found'
    };

    var dataConstants = {
        SUPPORTED_CURRENCIES: ['RUB', 'EUR']
    };

    angular
        .module('currency.rates')
        .constant('dataServicesConstants', dataServicesConstants)
        .constant('textConstants', textConstants)
        .constant('dataConstants', dataConstants)


})();
