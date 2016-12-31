import angular from 'angular';
import uiRouter from 'angular-ui-router';
import organizationComponent from './organization.component';

let organizationModule = angular.module('organization', [
  uiRouter
])

.component('organization', organizationComponent)

.name;

export default organizationModule;
