import angular from 'angular';
import uiRouter from 'angular-ui-router';
import profileComponent from './profile.component';

let profileModule = angular.module('profile', [
  uiRouter,
  'user',
  'navbar'
])

.config(($stateProvider) => {
  "ngInject";
  $stateProvider
    .state('profile', {
      url: '/profile',
      component: 'profile'
    });
})

.run(['Menu', function(Menu){
Menu.addToMainMenu({ display: "Profile", url: "/profile", requireLogin: true })

}])



.component('profile', profileComponent)

.name;

export default profileModule;
