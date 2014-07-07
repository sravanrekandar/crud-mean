angular.module('avenirApp.controllers')
    .controller('AddProductsCtrl', [
		'$scope', 
		'$modalInstance',
		'cust',
		'ProductsSvc',
		'lodash',
		function ($scope, $modalInstance, cust, ProductsSvc, lodash) {
			$scope.customer = cust;
			$scope.alert = {};
			$scope.selectedProducts = [];
			$scope.selectedProduct = '';
			$scope.lastResultingProducts = [];
			$scope.loadingLocations = false;
			$scope.addThisProduct = function (product, evt) {
				if (evt && evt.keyCode === 13) {
					$scope.addProduct(product);
				} else if(!evt){
					$scope.addProduct(product);
				}
			};
			$scope.addProduct = function (product) {
				var msg = '';
				if (typeof product !== 'object') {
					return;
				}
				var existingElements = lodash.filter($scope.selectedProducts, product);
				var existingElementsInCustomer = lodash.filter($scope.customer.products, product);
				if (existingElements.length === 0 && existingElementsInCustomer.length === 0) {
					$scope.selectedProducts.push(product);
				} else {
					msg = 'Cannot add an existing/selected product';
				}
				$scope.addAlert(msg);
				$scope.selectedProduct = '';
			};
			$scope.getFilteredProducts = function (val) {
				$scope.loadingLocations = true;
				return ProductsSvc.filter({name: val}).then(function (response) {
					var products = response.data;
					$scope.loadingLocations = false;
					$scope.lastResultingProducts = products; // This is useful for test cases
					return products;
				});
			};
			$scope.addAlert = function(msg) {
				$scope.alert.msg = msg;
			};

			$scope.closeAlert = function(index) {
				$scope.alert.msg = '';
			};
			$scope.ok = function () {
				$modalInstance.close({
							selectedProducts:$scope.selectedProducts,
							customer:$scope.customer
							});
			};
			$scope.cancel = function () {
				$modalInstance.dismiss('cancel');
			};
		}])
;