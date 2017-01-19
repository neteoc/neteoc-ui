import angular from 'angular';
import uiRouter from 'angular-ui-router';
import missionsComponent from './missions.component';
import navbar from '../../common/navbar/navbar'
import MissionFactory from './missions.services';

require('angular-ui-grid/ui-grid.css');

let missionsModule = angular.module('missions', [
  uiRouter,
  navbar,
  require('angular-ui-grid')
])


  .factory('Mission', MissionFactory)


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
