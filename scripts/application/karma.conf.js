module.exports = function(config) {
    config.set({

        basePath: '',

        frameworks: ['jasmine'],

        files: [
            "bower_components/angular/angular.js",
            "bower_components/angular-mocks/angular-mocks.js",
            "currency-rates/currency-rates.module.js",
            "currency-rates/*.js",
            "currency-rates/**/*.js",
            "tests/*.js"
        ],
        logLevel: config.LOG_INFO,
        autoWatch: false,
        browsers: ['Chrome', 'Firefox'],
        captureTimeout: 60000,
        singleRun: true
    });
};

