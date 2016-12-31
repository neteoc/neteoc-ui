import angular from 'angular';
import uiRouter from 'angular-ui-router';
import homeComponent from './home.component';

let homeModule = angular.module('home', [
  uiRouter,
  'navbar'
])

.config(($stateProvider, $urlRouterProvider) => {
  "ngInject";

  $urlRouterProvider.otherwise('/');

  $stateProvider
    .state('home', {
      url: '/',
      component: 'home'
    });
})

.run(['Menu', function(Menu){
Menu.addToMainMenu({ display: "Home", url: "/" })

}])

.component('home', homeComponent)

.name;

export default homeModule;
