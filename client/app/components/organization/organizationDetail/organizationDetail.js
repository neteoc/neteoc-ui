import angular from 'angular';
import uiRouter from 'angular-ui-router';
import organizationDetailComponent from './organizationDetail.component';

let organizationDetailModule = angular.module('organizationDetail', [
  uiRouter
])

.config(($stateProvider) => {
  "ngInject";
  $stateProvider
    .state('organizationDetail', {
      url: '/organization/:organizationId',
      component: 'organizationDetail'
    });
})

.component('organizationDetail', organizationDetailComponent)

.name;

export default organizationDetailModule;
