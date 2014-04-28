describe('Controller: ProductsController', function () {
    'use strict';
    var ProductsCtrl,
        scope,
        productService,
        _$q,
        _$rootScope;
    beforeEach(module('avenirApp'));
    beforeEach(inject(function ($controller, $rootScope, $q, ProductsSvc) {
        scope = $rootScope.$new();
        _$rootScope = $rootScope;
        productService = ProductsSvc;
        _$q = $q;
        ProductsCtrl = $controller('ProductsCtrl', {
            $scope: scope,
            ProductsSvc: productService
        });
    }));

    it('should have the controller: ProductsCtrl', function () {
        expect(ProductsCtrl).toBeDefined();
    });

    describe('Methods - Availability: ', function () {
        it('Should have the method refreshProducts', function () {
            expect(scope.init).toBeDefined();
        });
        it('Should have the method refreshProducts', function () {
            expect(scope.refreshProducts).toBeDefined();
        });

        it('Should have the method createProduct', function () {
            expect(scope.createProduct).toBeDefined();
        });
        it('Should have the method updateProduct', function () {
            expect(scope.updateProduct).toBeDefined();
        });
        it('Should have the method removeProduct', function () {
            expect(scope.removeProduct).toBeDefined();
        });
    });

    describe('Methods -- : ', function () {
        var deferred,
            promise;
        beforeEach(function () {
            deferred = _$q.defer();
            promise = deferred.promise;
        });
        it('createProduct() method should send data and refresh products', function () {
            spyOn(scope, 'refreshProducts');
            scope.init();
            expect(scope.refreshProducts).toHaveBeenCalled();
        });
        it('refreshProducts() method should update scope.products', function () {
            var resolvedValue = [];
            spyOn(productService, 'query').andReturn(deferred.promise);
            deferred.resolve({data: resolvedValue});

            scope.refreshProducts();
            _$rootScope.$apply();
            expect(productService.query).toHaveBeenCalled();
            expect(scope.products).toBe(resolvedValue);
        });
        it('createProduct() method should send data and refresh products', function () {
            var resolvedValue = [];
            spyOn(productService, 'save').andReturn(deferred.promise);
            spyOn(scope, 'refreshProducts');
            deferred.resolve({data: resolvedValue});

            scope.newProduct = 'prodsample';
            scope.createProduct(true);
            _$rootScope.$apply();
            expect(productService.save).toHaveBeenCalled();
            expect(productService.save).toHaveBeenCalledWith({name: 'prodsample'});
            expect(scope.refreshProducts).toHaveBeenCalled();

            productService.save.reset();
            scope.createProduct(false);
            _$rootScope.$apply();
            expect(productService.save).not.toHaveBeenCalled();
        });

        // TODO: replace console.log with Toastr.Alert..
        it('updateProduct() method should send data', function () {
            var resolvedValue = [];
            spyOn(productService, 'save').andReturn(deferred.promise);
            spyOn(console, 'log');
            deferred.resolve({data: resolvedValue});

            var product = {
                id: 'prod-id',
                name: 'prod-name'
            };

            scope.updateProduct(product);
            _$rootScope.$apply();
            expect(productService.save).toHaveBeenCalled();
            expect(productService.save).toHaveBeenCalledWith(product);
            expect(console.log).toHaveBeenCalled();
        });

        it('removeProduct() method should send data', function () {
            var resolvedValue = [];
            spyOn(productService, 'delete').andReturn(deferred.promise);
            spyOn(console, 'log');
            spyOn(scope, 'refreshProducts');
            deferred.resolve({data: resolvedValue});

            var product = {
                id: 'prod-id',
                name: 'prod-name'
            };

            scope.removeProduct(product);
            _$rootScope.$apply();
            expect(productService.delete).toHaveBeenCalled();
            expect(productService.delete).toHaveBeenCalledWith(product.id);
            expect(console.log).toHaveBeenCalled();
            expect(scope.refreshProducts).toHaveBeenCalled();
        });
    });
});