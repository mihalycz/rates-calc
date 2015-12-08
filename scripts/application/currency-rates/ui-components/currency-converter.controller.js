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
