import angular from 'angular';
import uiRouter from 'angular-ui-router';
import flareComponent from './flare.component';

let flareModule = angular.module('flare', [
  uiRouter
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
  Menu.addToMainMenu({ display: "Flare", url: "/flare/", requireLogin: true })
}])

.component('flare', flareComponent)

.name;

export default flareModule;
