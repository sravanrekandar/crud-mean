'use strict';

// Sub modules
angular.module('avenirApp.controllers', []);
angular.module('avenirApp.services', []);
angular.module('avenirApp.filters', []);
angular.module('avenirApp.directives', []);


angular.module('avenirApp', [
    'ngRoute',
    'ngResource',
    'ui.bootstrap',
    'avenirApp.filters',
    'avenirApp.services',
    'avenirApp.directives',
    'avenirApp.controllers'
]).
config(['$routeProvider', function ($routeProvider) {
    $routeProvider.when('/products', {templateUrl: 'partials/products.html', controller: 'ProductsCtrl'});
    $routeProvider.when('/customers', {templateUrl: 'partials/customers.html', controller: 'CustomersCtrl'});
    $routeProvider.otherwise({redirectTo: '/products'});
}]);
