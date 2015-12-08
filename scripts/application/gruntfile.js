module.exports = function (grunt) {
    grunt.initConfig({
        concat: {
            options: {
                separator: '\n'
            },
            // framework sources:
            js_libs: {
                src: [
                    'bower_components/angular/angular.js'
                ],				
                dest: '../currency.rates.libs.js'
            },
            // application sources
            js_app: {
                src: [
                    'currency-rates/currency-rates.module.js',
                    'currency-rates/*.js',
                    'currency-rates/**/*.js',
                    'build/templates_app.js'
                ],
                dest: '../currency.rates.application.js'
            },
            // styles sources:
            css_app: {
                src: [
                    '../../styles/styles.css'
                ],
                dest: '../../styles/currency.rates.application.css'
            }
        },
        // html templates sources:
        ngtemplates: {
            app: {
                options: {
                    htmlmin: {
                        collapseWhitespace: true,
                        collapseBooleanAttributes: true
                    },
                    module: 'currency.rates',
                    bootstrap: function (module, script) {
                        return "angular.module('" + module + "').run(['$templateCache', function($templateCache) {\n" + script + "\n}]);\n";
                    },
                    url: function (path) {
                        return path.split('/').pop();
                    }
                },
                src: ['currency-rates/*.html', 'currency-rates/**/*.html'],
                dest: 'build/templates_app.js'
            }
        },
        // styles min.:
        cssmin: {
            app: {
                files: [{ src: '../../styles/currency.rates.application.css', dest: '../../styles/currency.rates.application.min.css' }]
            }
        },
        // source code uglify:
        uglify: {
            options: {
                banner: '/*\n currency rates application \n*/\n'
            },
            min_libs: {
                files: {
                    '../currency.rates.libs.min.js': ['../currency.rates.libs.js']
                }
            },
            min_app: {
                files: {
                    '../currency.rates.application.min.js': ['../currency.rates.application.js']
                }
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-htmlmin');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-angular-templates');

    grunt.registerTask('default', [
        'concat:js_libs',
        'ngtemplates',
        'concat:js_app',
        'concat:css_app',
        'uglify:min_libs',
        'uglify:min_app',
        'cssmin:app' ]);
};