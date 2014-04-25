'use strict';
angular.module('avenirApp.controllers')
    .controller('ProductsCtrl', ['$scope', 'ProductsSvc', function ($scope, ProductsSvc) {
        $scope.refreshProducts = function () {
            ProductsSvc.query().then(function (response) {
                $scope.products = response.data;
            });
        };
        $scope.createProduct = function(valid){
            if(!valid || $scope.newProduct === '') {return;}
            ProductsSvc.save({
                name: $scope.newProduct
            }).then(function (response) {
                $scope.refreshProducts();
            });
            $scope.newProduct = '';
        };


        $scope.updateProduct = function(product){
            ProductsSvc.save(product).then(function (response) {
                console.log(response.data);
            });
        };

        $scope.removeProduct = function (product) {
            ProductsSvc.delete(product.id).then(function (response) {
                console.log(response.data);
                $scope.refreshProducts();
            });
        };

        $scope.init = function () {
            $scope.refreshProducts();
        };
    }])
;

/*
 1. A GET request to /product/ returns a list of products.
 2. A GET request to /product/15 returns the product with ID 15.
 3. A POST request to /product/ with product info in the POST data creates a new product.
 4. A POST request to /product/15 with product info in the POST data updates the product with ID 15.
 5. A DELETE request to /product/15 deletes the product with ID 15.

 // 1. Get All Products
 ProductsSvc.query().then(function(response){
 $scope.products = response.data;
 });

 // 2. Get a single product
 var prodId = 'prod2';
 ProductsSvc.get(prodId).then(function(response){
 console.log(response.data);
 });


 // 3 .Create a new Product
 ProductsSvc.save({
 name: 'scarf'
 }).then(function(response){
 console.log(response.data);
 });

 // 4. Updates the product
 ProductsSvc.save({
 id: 'prod2',
 name: 'scarf'
 }).then(function(response){
 console.log(response.data);
 });

 // 5. Deletes the product
 ProductsSvc.delete('prod2').then(function(response){
 console.log(response.data);
 });


 */
