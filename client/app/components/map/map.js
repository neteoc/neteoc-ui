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
      url: '/map',
      component: 'map'
    });
})

.run(['Menu', function(Menu){
  Menu.addToMainMenu({ display: "Map", url: "/map", requireLogin: true })
}])

.component('map', mapComponent)

.name;

export default mapModule;
