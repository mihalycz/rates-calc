describe('Currency Rates Test', function() {
    var rates,
        latestRatesDataService,
        conversionTypesBlService,
        conversionTypes = [
        {
            name: 'RUB>EUR',
            base: 'RUB',
            into: 'EUR'
        },
        {
            name: 'EUR>RUB',
            base: 'EUR',
            into: 'RUB'
        }
    ];

    beforeEach(module('currency.rates'));

    beforeEach(inject(function (_conversionTypesBlService_) {
        conversionTypesBlService = _conversionTypesBlService_;
    }));

    it('should return conversion types', function() {
        expect(conversionTypesBlService.getConversionTypes()).toEqual(conversionTypes);
    })
});
