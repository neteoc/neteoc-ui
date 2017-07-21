import angular from 'angular';
import uiRouter from 'angular-ui-router';
import missionDetailComponent from './missionDetail.component';
import AuthService from '../../../common/user/auth.service';

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

.service('AuthService', AuthService)

.name;

export default missionDetailModule;
