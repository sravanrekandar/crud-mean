'use strict';
angular.module('avenirApp.controllers')
    .controller('CustomersCtrl', ['$scope', 'CustomersSvc', '$modal', function ($scope, CustomerSvc, $modal) {
	console.log($modal);
		$scope.refreshCustomers = function () {
            CustomerSvc.query().then(function (response) {
                $scope.customers = response.data;
            });
        };
		$scope.removeProduct = function(cust){
			return function(pro) {
				var index = cust.products.indexOf(pro);
				cust.products.splice(index, 1);
				CustomerSvc.save(cust).then(function(response){
					console.log(response.data.data);
				});
			};
		};
		$scope.addProducts = function(cust){
			var modalInstance = $modal.open({
				templateUrl: 'partials/add-products.html',
				controller: 'AddProductsCtrl',
				resolve: {
					cust: function () {
						return cust;
					}
				}
			});
			modalInstance.result.then(function (data) {
				for(var i = 0; i < data.selectedProducts.length; i++) {
					data.customer.products.push(data.selectedProducts[i]);
				}
				CustomerSvc.save(cust).then(function(response){
					console.log(response.data.data);
				});
			});
		};
		$scope.init = function () {
			$scope.refreshCustomers();
		};
    }])
;