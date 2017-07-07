import angular from 'angular';
import uiRouter from 'angular-ui-router';
import missionDetailComponent from './missionDetail.component';

let missionDetailModule = angular.module('missionDetail', [
  uiRouter
])

  .config(($stateProvider) => {
    "ngInject";
    $stateProvider
      .state('missionDetail', {
        url: '/missions/:missionId',
        component: 'missionDetail'
      });
  })

.component('missionDetail', missionDetailComponent)

.name;

export default missionDetailModule;
