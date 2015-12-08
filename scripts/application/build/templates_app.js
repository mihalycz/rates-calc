angular.module('currency.rates').run(['$templateCache', function($templateCache) {
  'use strict';

  $templateCache.put('currency-converter.directive.html',
    "<form name=\"currencyConverterForm\" class=\"currency-converter-form\" ng-controller=\"CurrencyConverterController\"><div class=\"converter-container\"><input ng-change=\"convert()\" type=\"number\" name=\"base-currency-value\" ng-model=\"model.baseCurrencyValue\" ng-pattern=\"/^[0-9]+(\\.[0-9]{1,2})?$/\" parse-number required><select name=\"conversion-type\" class=\"conversion-type\" ng-model=\"model.conversionType\" ng-options=\"item.name for item in model.conversionTypes\"></select></div><div class=\"converter-container-result\" ng-show=\"model.result\"><div class=\"result\">{{ model.result | currency : (model.conversionType.into + \" \") : 2 }}</div></div><div class=\"converter-container-processing\" ng-show=\"isProcessing\"><div class=\"processing\"></div></div><div class=\"converter-container-processing\" ng-show=\"isError\"><div class=\"error\">{{ errorReason }}</div></div></form>"
  );

}]);
