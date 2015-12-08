// latest rates service factory
(function () {

    'use strict';

    angular
        .module('currency.rates')
        .factory('latestRatesDataService', ['jsonpHttpService', 'dataServicesConstants', 'textConstants', '$q', latestRatesDataService]);

    function latestRatesDataService(jsonpHttpService, dataServicesConstants, textConstants, $q) {

        return {
            getRate: getRate
        };

        function getRate(base) {
            if (base && typeof base === "string") {
                return jsonpHttpService.jsonp(dataServicesConstants.PATH_TO_LATEST_RATES, { base: base }).then(successHandler, errorHandler);
            }
            return null;
        }

        function successHandler(response) {
            if (!(typeof response.data === "object") || !response.data.hasOwnProperty("rates")) {
                return $q.reject(textConstants.NO_DATA_ERROR);
            }
            return response.data;
        }

        function errorHandler(response) {
            return $q.reject(response['statusText'] === "error" ? textConstants.FIXER_SERVER_ERROR : response['statusText']);
        }
    }

})();
