import angular from 'angular';
import uiRouter from 'angular-ui-router';
import organizationComponent from './organization.component';

require('angular-datatables/dist/plugins/columnfilter/angular-datatables.columnfilter.js');
require('angular-datatables/dist/plugins/bootstrap/angular-datatables.bootstrap.js');
require('datatables.net-select');
require('angular-datatables/dist/plugins/select/angular-datatables.select.min.js');

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
