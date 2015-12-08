describe('latestRatesDataService', function() {
    var service,
        http,
        mockEroBaseRates = { id: 1, name: "John Doe" };



    angular.callbacks._1({"base":"RUB","date":"2015-07-10","rates":{"AUD":0.0238,"BGN":0.031,"BRL":0.0565,"CAD":0.0225,"CHF":0.0166,"CNY":0.1102,"CZK":0.4303,"DKK":0.1184,"GBP":0.0114,"HKD":0.1375,"HRK":0.1202,"HUF":4.9336,"IDR":235.75,"ILS":0.0668,"INR":1.1249,"JPY":2.1714,"KRW":19.994,"MXN":0.2787,"MYR":0.0673,"NOK":0.1412,"NZD":0.0263,"PHP":0.8003,"PLN":0.0662,"RON":0.0705,"SEK":0.1493,"SGD":0.0239,"THB":0.602,"TRY":0.0473,"USD":0.0177,"ZAR":0.2202,"EUR":0.0159}})

    beforeEach(module('currency.rates'));

    beforeEach(inject(function(latestRatesDataService, $httpBackend) {
        service = latestRatesDataService;
        http = $httpBacked;
    }));

    it('should fetch an employee', function(done) {
        var testEmployee = function(employee) {
            expect(employee.name).toBe(mockEmployee.name);
            expect(employee.id).toBe(mockEmployee.id);
        };

        var failTest = function(error) {
            expect(error).toBeUndefined();
        };

        http.expectGET('/employees/1').respond(200,mockEmployee);

        service.get(mockEmployee.id)
            .then(testEmployee)
            .catch(failTest)
            .finally(done);

        http.flush();
    });
});
