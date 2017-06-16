import angular from 'angular';
import uiRouter from 'angular-ui-router';
import listsComponent from './lists.component';

let listsModule = angular.module('lists', [
  uiRouter
])

.config(($stateProvider) => {
  "ngInject";
  $stateProvider
    .state('lists', {
      url: '/lists',
      component: 'lists'
    });
})

.component('lists', listsComponent)

.name;

export default listsModule;
