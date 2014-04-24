'use strict';
describe('Directive: tsFloatingItems', function () {

    var el,
        scope,
        stubEditMethod,
        stubRemoveMethod,
        $compile;

    beforeEach(module('avenirApp.directives'));
    beforeEach(inject(function ($compile, $rootScope) {

        scope = $rootScope;
        scope.products = [
            {id: 'prod1', name: 'first product'},
            {id: 'prod2', name: 'second product'},
            {id: 'prod3', name: 'second product'}
        ];
    }));
    describe('With Parameters ::', function(){
        beforeEach(inject(function (_$compile_, $rootScope) {
            $compile = _$compile_
            stubRemoveMethod = sinon.stub();
            scope.removeProduct = sinon.stub();
            scope.updateProduct = sinon.stub();
            el = angular.element('<ts-floating-items ng-model="products" remove-button="true" remove-item-method="removeProduct" update-item-method="updateProduct" editable="true"></ts-floating-items>');
            $compile(el)(scope);
            scope.$digest();
        }));

        it('number of li elements should match the number of products', function () {
            expect($('li', el).length).toBe(scope.products.length);
        });

        it('The text li elements should match the names of the products', function () {
            $('li', el).each(function (idx) {
                expect($(this).text()).toContain(scope.products[idx].name);
            });
        });

        it('Remove buttons should be visible', function () {
            expect($('[data-tfi-role="remove"]', el).length).toBe(3);
            expect($('[data-tfi-role="remove"].ng-hide', el).length).toBe(0);
        });

        it('Remove buttons should be visible', function () {
            expect($('[data-tfi-role="remove"].ng-hide', el).length).toBe(0);
        });

        it('Remove Method should be called when remove button is clicked', function () {
            $('[data-tfi-role="remove"]', el).eq(0).click();
            expect(scope.removeProduct).toHaveBeenCalled();
            expect(scope.removeProduct).toHaveBeenCalledWith(scope.products[0]);
        });

        it('Item should switch to edit mode when the item is clicked', function () {
            var elView = $('[data-tfi-role="view"]', el).eq(0),
                elEdit = $('[data-tfi-role="edit"]', el).eq(0)
            elView.click();
            expect(elView.hasClass('ng-hide')).toBeTruthy();
            expect(elEdit.hasClass('ng-hide')).toBeFalsy();
        });

        it('Item should switch back to view mode and resets the value when the input is blurred', function () {
            var elView = $('[data-tfi-role="view"]', el).eq(0),
                elEdit = $('[data-tfi-role="edit"]', el).eq(0),
                value = scope.products[0].name;
            elView.click();
            scope.products[0].name = 'new name';
            scope.$apply();
            elEdit.blur();
            expect(elView.hasClass('ng-hide')).toBeFalsy(); // ViewElement should be visible
            expect(elEdit.hasClass('ng-hide')).toBeTruthy();// EditElement should be hidden
            expect(scope.products[0].name).toBe(value);
        });

        it('Item should switch back to view mode and reset the value when clicked else where on the screen', function () {
            var elView = $('[data-tfi-role="view"]', el).eq(0),
                elEdit = $('[data-tfi-role="edit"]', el).eq(0),
                value = scope.products[0].name;
            elView.click();
            scope.products[0].name = 'new name';
            scope.$apply();
            angular.element(document).click();
            expect(elView.hasClass('ng-hide')).toBeFalsy(); // ViewElement should be visible
            expect(elEdit.hasClass('ng-hide')).toBeTruthy();// EditElement should be hidden
            expect(scope.products[0].name).toBe(value);
        });

        it('Should reset the item when Escape key been pressed in the input', function () {
            var elView = $('[data-tfi-role="view"]', el).eq(0),
                elEdit = $('[data-tfi-role="edit"]', el).eq(0),
                value = scope.products[0].name;
            elView.click();
            scope.products[0].name = 'new name';
            scope.$apply();

            var e = jQuery.Event("keyup");
            e.which = 27; // Escape Key
            e.keyCode = 27; // Escape Key
            elEdit.trigger(e);
            scope.$apply();

            expect(elView.hasClass('ng-hide')).toBeFalsy(); // ViewElement should be visible
            expect(elEdit.hasClass('ng-hide')).toBeTruthy();// EditElement should be hidden
            expect(scope.products[0].name).toBe(value);
            expect(scope.updateProduct).not.toHaveBeenCalled();
            expect(scope.updateProduct).not.toHaveBeenCalledWith(scope.products[0]);
        });

        it('Should call the updateMethod when the Enter key been pressed in the input', function () {
            var elView = $('[data-tfi-role="view"]', el).eq(0),
                elEdit = $('[data-tfi-role="edit"]', el).eq(0),
                value = scope.products[0].name;
            elView.click();
            scope.products[0].name = 'new name';
            scope.$apply();

            var e = jQuery.Event("keyup");
            e.which = 13; // Enter Key
            e.keyCode = 13; // Enter Key
            elEdit.trigger(e);
            scope.$apply();

            expect(elView.hasClass('ng-hide')).toBeFalsy(); // ViewElement should be visible
            expect(elEdit.hasClass('ng-hide')).toBeTruthy();// EditElement should be hidden

            expect(scope.updateProduct).toHaveBeenCalled();
            expect(scope.updateProduct).toHaveBeenCalledWith(scope.products[0]);
        });

    });

    describe('With out Parameters ::', function() {
        beforeEach(inject(function (_$compile_, $rootScope) {
            $compile = _$compile_
            stubRemoveMethod = sinon.stub();
            scope.removeProduct = sinon.stub();
            scope.updateProduct = sinon.stub();
            el = angular.element('<ts-floating-items ng-model="products"></ts-floating-items>');
            $compile(el)(scope);
            scope.$digest();
        }));

        it('Remove buttons should not be visible(remove-button = false)', function () {
            expect($('[data-tfi-role="remove"]', el).length).toBe(3);
            expect($('[data-tfi-role="remove"].ng-hide', el).length).toBe(3);
        });

        it('Item should not switch to edit mode when the item is clicked(editable=false)', function () {
            var elView = $('[data-tfi-role="view"]', el).eq(0),
                elEdit = $('[data-tfi-role="edit"]', el).eq(0)
            elView.click();
            expect(elView.hasClass('ng-hide')).toBeFalsy();
            expect(elEdit.hasClass('ng-hide')).toBeTruthy();
        });
    });
});