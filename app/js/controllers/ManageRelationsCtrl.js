'use strict';
angular.module('avenirApp').controller('ManageRelationsCtrl', ['$scope', 'ProductsSvc', 'lodash', function($scope, ProductsSvc, lodash){
    $scope.selectedProducts = [];
    $scope.selectedProduct = '';
    $scope.loadingLocations = false;
    $scope.addThisProduct = function(evt, product){
      if(evt.keyCode === 13) {
          $scope.addProduct(product);
      }
    };
    $scope.addProduct = function(product) {
        if(typeof product !== 'object' ){return;}
        var existingElements = lodash.filter($scope.selectedProducts, product);
        if(existingElements.length === 0) {
            $scope.selectedProducts.push(product);
        }
        $scope.selectedProduct= '';
    };
    $scope.getFilteredProducts = function(val) {
        $scope.loadingLocations
        return ProductsSvc.filter({name: val}).then(function(response){
            var products = response.data;
            $scope.loadingLocations
            return products;
        });
    };
}]);