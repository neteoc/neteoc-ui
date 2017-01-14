import angular from 'angular';
import uiRouter from 'angular-ui-router';
import organizationComponent from './organization.component';

let organizationModule = angular.module('organization', [
  uiRouter,  
  'navbar'
])

.config(($stateProvider) => {
  "ngInject";
  $stateProvider
    .state('organization', {
      url: '/organization',
      component: 'organization'
    });
})

.run(['Menu', function(Menu){
  Menu.addToMainMenu({ display: "Organization", url: "/organization", requireLogin: true })
}])

.component('organization', organizationComponent)

.name;

export default organizationModule;
