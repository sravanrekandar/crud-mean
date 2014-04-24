angular.module('avenirApp.services').factory('ProductsSvc', ['$http', function ($http) {
    var baseUrl = '/product';
    return {
        get: function(prodId) {
            return $http.get(baseUrl + '/' + prodId);
        },
        save: function(product) {
            if(!product){return;}
            var url = product.id ? baseUrl + '/' + product.id : baseUrl;
            return $http.post(url, product);
        },
        query: function() {
            return $http.get(baseUrl);
        },
        delete: function(prodId) {
            return $http.delete(baseUrl + '/' + prodId);
        },
        filter: function(filterObj) {
            return $http.get(baseUrl + '/filter', {
                params: filterObj
            });
        }
    };
}]);