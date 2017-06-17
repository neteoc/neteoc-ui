import angular from 'angular';
import uiRouter from 'angular-ui-router';
import flareComponent from './flare.component';
import lists from './lists/lists';

let flareModule = angular.module('flare', [
  uiRouter,
  lists
])

.config(($stateProvider) => {
  "ngInject";
  $stateProvider
    .state('flare', {
      url: '/flare/:recipientId',
      component: 'flare'
    });
})

.run(['Menu', function(Menu){
  Menu.addToMainMenu({ 
    display: "Flare", 
    url: "/flare/", 
    requireLogin: true,
    requireDev: true })
}])

.component('flare', flareComponent)

.name;

export default flareModule;
