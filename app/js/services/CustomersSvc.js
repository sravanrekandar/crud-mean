angular.module('avenirApp.services').factory('CustomersSvc', ['$http', function ($http) {
    var baseUrl = '/customer';
    return {
        get: function(custId) {
            return $http.get(baseUrl + '/' + custId);
        },
        save: function(customer) {
            var url = customer.id ? baseUrl + '/' + customer.id : baseUrl;
            return $http.post(url, customer);
        },
        query: function() {
            return $http.get(baseUrl);
        },
        charge: function(customer) {
            return $http.post(baseUrl + '/' + customer.id, customer, {params: {charge: true}});
        },
        delete: function(custId) {
            return $http.delete(baseUrl + '/' + custId);
        },
        filter: function(filterObj) {
            return $http.get(baseUrl + '/filter', {
                params: filterObj
            });
        }
    };
}]);