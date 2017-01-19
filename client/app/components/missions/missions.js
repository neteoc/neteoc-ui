import angular from 'angular';
import uiRouter from 'angular-ui-router';
import missionsComponent from './missions.component';
import navbar from '../../common/navbar/navbar'

let missionsModule = angular.module('missions', [
  uiRouter,
  navbar,
])

  .config(($stateProvider) => {
    "ngInject";
    $stateProvider
      .state('missions', {
        url: '/missions/',
        component: 'missions'
      });
  })

  .run(['Menu', function(Menu){
    Menu.addToMainMenu({ display: "Missions", url: "/missions/", requireLogin: true })
  }])

.component('missions', missionsComponent)

.name;

export default missionsModule;
