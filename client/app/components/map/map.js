import angular from 'angular';
import uiRouter from 'angular-ui-router';
import mapComponent from './map.component';

let mapModule = angular.module('map', [
  uiRouter
])

.config(($stateProvider) => {
  "ngInject";
  $stateProvider
    .state('map', {
      url: '/gis',
      component: 'map'
    });
})

.run(['Menu', function(Menu){
  Menu.addToMainMenu({ display: "GIS", url: "/gis", requireLogin: false })
}])

.component('map', mapComponent)

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
