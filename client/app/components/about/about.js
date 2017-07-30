import angular from 'angular';
import uiRouter from 'angular-ui-router';
import aboutComponent from './about.component';

let aboutModule = angular.module('about', [
  uiRouter,
  'navbar'
])

.config(($stateProvider) => {
  "ngInject";
  $stateProvider
    .state('about', {
      url: '/about',
      component: 'about',
      
    });
})

//
.run(['Menu', function(Menu){
Menu.addToMainMenu({ 
  display: "About", 
  url: "/about", 
  requireLogin: true,
  requireDev: true })

}])

.component('about', aboutComponent)

.name;

export default aboutModule;
