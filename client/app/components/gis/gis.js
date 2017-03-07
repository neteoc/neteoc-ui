import angular from 'angular';
import uiRouter from 'angular-ui-router';
import mapComponent from './gis.component';

let mapModule = angular.module('gis', [
  uiRouter
])

.config(($stateProvider) => {
  "ngInject";
  $stateProvider
    .state('gis', {
      url: '/gis',
      component: 'gis'
    });
})

.run(['Menu', function(Menu){
  Menu.addToMainMenu({ display: "GIS", url: "/gis", requireLogin: false })
}])

.component('gis', mapComponent)

.directive('customOnChange', function() {
  return {
    restrict: 'A',
    link: function (scope, element, attrs) {
      var onChangeHandler = scope.$eval(attrs.customOnChange);
      element.bind('change', onChangeHandler);
    }
  };
})

.name;

export default mapModule;
