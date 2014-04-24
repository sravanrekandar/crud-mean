'use strict';
angular.module('avenirApp.directives').directive('tsFloatingItems', ['$document', function($document){
    var template = '<ul class="list-inline directive-tfi">' +
                       '<li ng-repeat="i in items" >' +
                            '<button class="btn btn-sm">' +
                            '<span data-tfi-role="view" ng-show="!editable || !i._editmode" ng-click="edit(i)">{{i.name}}</span>' +
                            '<input data-tfi-role="edit"' +
                                'ng-model="i.name"' +
                                'ng-show="i._editmode && editable"'+
                                'ng-blur="cancelEdit(i)"' +
                                'ng-keyup="editing($event, i)"' +
                                'size="{{i.name.length}}" style="border:none; padding:0;outline:none"' +
                                'data-tfi-role="edit"" />' +
                            '&nbsp;&nbsp;' +
                            '<i class="glyphicon glyphicon-remove" data-tfi-role="remove" title="remove" alt="remove" ng-show="displayCloseButton" ng-click="removeItem(i)"></i>' +
                            '</button>' +
                        '</li>' +
                    '</ul>';
    return {
        restrict: 'EA',
        template: template,
        scope: {
            items: '=ngModel',
            removeButton: '@',
            removeItemMethod: '=',
            updateItemMethod: '=',
            editable: '@'
        },
        link: function (scope, iElement, iAttrs) {
            var oldVal = '';
            scope.itemInEditMode = null;
            scope.itemNameCache = '';
            scope.editable = (scope.editable && scope.editable !== 'false') ? true : false;
            scope.displayCloseButton = (scope.removeButton && scope.removeButton !== 'false') ? true : false;
            scope.removeItem = scope.removeItemMethod || function(item) {
                var index = scope.items.indexOf(item);
                scope.items.splice(index, 1);
            };
            scope.updateItem = scope.updateItemMethod || function(item) {
                // Already updated through ng-model
            };
            scope.edit = function(item){
                if(!scope.editable) {return;}
                oldVal = item.name;
                item._editmode = true;
                if(scope.itemInEditMode !== item && scope.itemInEditMode !== null) {
                   scope.itemInEditMode._editmode = false;
                }
                scope.itemInEditMode = item;
                scope.itemNameCache = item.name;
            };
            scope.cancelEdit = function(item){
                item._editmode = false;
                item.name = scope.itemNameCache;
            };
            scope.doneEdit = function(item){
                item._editmode = false;
                if(oldVal !== item.name) {
                    scope.updateItem(item);
                    scope.itemNameCache = scope.itemInEditMode.name;
                }
            };
            scope.editing = function(evt, item) {
              if(evt.keyCode === 13) {
                  scope.doneEdit(item);
              } else if(evt.keyCode === 27) {
                  scope.cancelEdit(item);
              }
            };
            $document.bind('click', function(evt){
                var currentTarget = angular.element(evt.target).closest(iElement);
                if(currentTarget.length === 0 && scope.itemInEditMode !== null){
                    scope.cancelEdit(scope.itemInEditMode);
                    scope.$apply();
                }
            });
        }
    };
}]);