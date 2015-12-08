// jsonp http service factory
(function () {

    'use strict';

    angular
        .module('currency.rates')
        .factory('jsonpHttpService', ['$http', jsonpHttpService]);

    function jsonpHttpService($http) {

        return {
            jsonp: jsonp
        };

        function jsonp(url, params, sucessHandler, errorHandler) {
            return $http.jsonp(url, {
                params: params
            }).then(sucessHandler, errorHandler);
        }
    }

})();