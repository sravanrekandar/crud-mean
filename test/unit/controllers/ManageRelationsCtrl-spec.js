'use strict';
describe('Controller: ManageRelationsCtrl', function () {
    'use strict';
    var ManageRelationsCtrl,
        scope,
        ProductsSvc,
        lodash,
        $q,
        $rootScope;
    beforeEach(module('avenirApp'));
    beforeEach(inject(function ($controller, _$rootScope_, _$q_, _ProductsSvc_, _lodash_) {
        $rootScope = _$rootScope_;
        scope = $rootScope.$new();
        ProductsSvc = _ProductsSvc_;
        lodash = _lodash_;
        $q = _$q_;
        ManageRelationsCtrl = $controller('ManageRelationsCtrl', {
            $scope: scope,
            ProductsSvc: ProductsSvc,
            lodash: lodash
        });
    }));
    it('should have the controller: ManageRelationsCtrl', function () {
        expect(ManageRelationsCtrl).toBeDefined();
    });
    it('Should have the method getFilteredProducts()', function () {
        expect(scope.getFilteredProducts).toBeDefined();
    });
    it('Should have the method addProduct()', function () {
        expect(scope.addProduct).toBeDefined();
    });
    it('getFilteredProducts() method should return a list of products', function () {
        var deferred = $q.defer(),
            promise = deferred.promise;

        var resolvedValue = [];
        spyOn(ProductsSvc, 'filter').andReturn(deferred.promise);

        var resultingProductsPromise = scope.getFilteredProducts();
        deferred.resolve({data: resolvedValue});
        $rootScope.$apply();
        expect(ProductsSvc.filter).toHaveBeenCalled();
        expect(scope.lastResultingProducts).toBe(resolvedValue);
    });
});