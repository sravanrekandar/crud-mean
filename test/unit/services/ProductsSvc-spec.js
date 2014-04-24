'use strict';
describe('ProductsSvc', function () {
    var $httpBackend,
        $rootScope,
        ProductsSvc,
        url;

    beforeEach(module('avenirApp.services'));
    beforeEach(inject(function (_$rootScope_, _$httpBackend_, _ProductsSvc_) {
        ProductsSvc = _ProductsSvc_;
        $httpBackend = _$httpBackend_;
        $rootScope = _$rootScope_;
        url = '/product';


    }));

    afterEach(function () {
        $httpBackend.verifyNoOutstandingRequest();
        $httpBackend.verifyNoOutstandingExpectation();
    });

    describe('Methods - Availability: ', function () {
        it('get() should be defined', function () {
            expect(ProductsSvc.get).toBeDefined();
        });
        it('save() should be defined', function () {
            expect(ProductsSvc.save).toBeDefined();
        });
        it('delete() should be defined', function () {
            expect(ProductsSvc.delete).toBeDefined();
        });
        it('filter() should be defined', function () {
            expect(ProductsSvc.filter).toBeDefined();
        });
    });

    describe('Methods - Functionality: ', function () {
        it('get() : should make a GET request to the server When no prodID passed.', function () {
            var message;
            $httpBackend.whenGET(url + '/undefined').respond({message: 'Returning all products'});
            $httpBackend.expectGET(url + '/undefined');
            ProductsSvc.get().then(function (response) {
                message = response.data.message;
            });
            $httpBackend.flush();
            expect(message).toBe('Returning all products');
        });
        it('get(prodId): should make a GET request to the server when a prodId is passed.', function () {
            var message,
                prodId = 'prod-1';
            $httpBackend.whenGET(url + '/prod-1').respond({message: 'Returning prod-1'});
            $httpBackend.expectGET(url + '/prod-1');
            ProductsSvc.get('prod-1').then(function (response) {
                message = response.data.message;
            });
            $httpBackend.flush();
            expect(message).toBe('Returning prod-1');
        });
        it('save(product): should make a POST request to the server when a product is passed with id.', function () {
            var message,
                product = {
                    id: 'prod-1',
                    name: 'first-product'
                };
            $httpBackend.whenPOST(url + '/prod-1').respond({message: 'Saving prod-1'});
            $httpBackend.expectPOST(url + '/prod-1');
            ProductsSvc.save(product).then(function (response) {
                message = response.data.message;
            });
            $httpBackend.flush();
            expect(message).toBe('Saving prod-1');
        });
        it('save(product): should make a POST request to the server when a product is passed without id.', function () {
            var message,
                product = {
                    name: 'first-product'
                };
            $httpBackend.whenPOST(url).respond({message: 'Creating a new product'});
            $httpBackend.expectPOST(url);
            ProductsSvc.save(product).then(function (response) {
                message = response.data.message;
            });
            $httpBackend.flush();
            expect(message).toBe('Creating a new product');
        });

        it('save(product): should make a POST request to the server when a product is passed without id.', function () {
            var message,
                product = {
                    name: 'first-product'
                };
            $httpBackend.whenPOST(url, product).respond({message: 'Creating a new product'});
            $httpBackend.expectPOST(url, product);
            ProductsSvc.save(product).then(function (response) {
                message = response.data.message;
            });
            $httpBackend.flush();
            expect(message).toBe('Creating a new product');
        });
        it('filter() : should make a GET request to the server with the filter object.', function () {
            var message,
                filterObj = {
                name: 'book'
            };
            $httpBackend.whenGET(url + '/filter?name=book').respond({message: 'Returning filtered products'});
            $httpBackend.expectGET(url + '/filter?name=book');
            ProductsSvc.filter(filterObj).then(function (response) {
                message = response.data.message;
            });
            $httpBackend.flush();
            expect(message).toBe('Returning filtered products');
        });

    });
});