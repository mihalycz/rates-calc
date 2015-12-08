(function () {
    'use strict';

    angular
        .module('currency.rates', []);
})();
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


// currency converter directive controller
(function () {
    'use strict';

    angular
        .module('currency.rates')
        .controller('CurrencyConverterController', ['$scope', 'currencyConverterBlService', 'currencyConverterModelService', CurrencyConverterController]);

    function CurrencyConverterController($scope, currencyConverterBlService, currencyConverterModelService) {
        // currency converter model
        $scope.model = currencyConverterModelService;
        // flag indicates is conversion in process
        $scope.isProcessing = false;
        // flag indicates is error occurred
        $scope.isError = false;
        // error reason text representation
        $scope.errorReason = null;
        // conversion process function
        $scope.convert = function () {
            var value = $scope.model.baseCurrencyValue,
                conversionType = $scope.model.conversionType;
            if (!$scope.isProcessing) {
                $scope.model.result = 0;
                if (value && conversionType.base && conversionType.into) {
                    $scope.isProcessing = true;
                    $scope.isError = false;
                    $scope.errorReason = null;
                    currencyConverterBlService.convert(conversionType.base, conversionType.into, value).then(function (result) {
                        $scope.isProcessing = false;
                        $scope.model.result = result;
                    }, function (reason) {
                        $scope.isProcessing = false;
                        $scope.isError = true;
                        $scope.errorReason = reason;
                    });
                }
            }
        };
        // if conversion type have changed runs conversion process
        $scope.$watch("model.conversionType", function (newValue, oldValue) {
            if (newValue) {
                $scope.convert();
            }
        });
    }
})();

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

angular.module('currency.rates').run(['$templateCache', function($templateCache) {
  'use strict';

  $templateCache.put('currency-converter.directive.html',
    "<form name=\"currencyConverterForm\" class=\"currency-converter-form\" ng-controller=\"CurrencyConverterController\"><div class=\"converter-container\"><input ng-change=\"convert()\" type=\"number\" name=\"base-currency-value\" ng-model=\"model.baseCurrencyValue\" ng-pattern=\"/^[0-9]+(\\.[0-9]{1,2})?$/\" parse-number required><select name=\"conversion-type\" class=\"conversion-type\" ng-model=\"model.conversionType\" ng-options=\"item.name for item in model.conversionTypes\"></select></div><div class=\"converter-container-result\" ng-show=\"model.result\"><div class=\"result\">{{ model.result | currency : (model.conversionType.into + \" \") : 2 }}</div></div><div class=\"converter-container-processing\" ng-show=\"isProcessing\"><div class=\"processing\"></div></div><div class=\"converter-container-processing\" ng-show=\"isError\"><div class=\"error\">{{ errorReason }}</div></div></form>"
  );

}]);
