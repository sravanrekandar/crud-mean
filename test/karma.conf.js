module.exports = function (config) {
    config.set({

        basePath: '../',

        files: [
            'bower_components/jquery/dist/jquery.js',
            'bower_components/lodash/dist/lodash.js',
            'bower_components/angular/angular.js',
            'bower_components/angular-route/angular-route.js',
            'bower_components/angular-resource/angular-resource.js',
            'bower_components/angular-bootstrap/ui-bootstrap.js',
            'bower_components/angular-bootstrap/ui-bootstrap-tpls.js',
            'bower_components/angular-mocks/angular-mocks.js',
            'bower_components/sinonjs/sinon.js',
            'bower_components/jasmine-sinon/lib/jasmine-sinon.js',
            'app/js/app.js',
            'app/js/services/*.js',
            'app/js/controllers/*.js',
            'app/js/directives/*.js',
            'test/unit/**/*.js'
        ],

        autoWatch: true,

        frameworks: ['jasmine'],

        browsers: ['Chrome'],

        plugins: [
            'karma-chrome-launcher',
            'karma-firefox-launcher',
            'karma-jasmine'
        ],

        junitReporter: {
            outputFile: 'test_out/unit.xml',
            suite: 'unit'
        }

    });
};