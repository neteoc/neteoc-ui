import angular from 'angular';
import uiRouter from 'angular-ui-router';
import missionsComponent from './missions.component';
import navbar from '../../common/navbar/navbar'
import MissionFactory from './missions.services';
import MissionDetail from './missionDetail/missionDetail';

require('angular-ui-grid/ui-grid.css');

let missionsModule = angular.module('missions', [
  uiRouter,
  navbar,
  MissionDetail,
  require('angular-ui-grid')
])


  .factory('Mission', ['$appEnvironment', MissionFactory])


  .config(($stateProvider) => {
    "ngInject";
    $stateProvider
      .state('missions', {
        url: '/missions',
        component: 'missions'
      });
  })

  .run(['Menu', function(Menu){
    Menu.addToMainMenu({ display: "Missions", url: "/missions", requireLogin: true })
  }])

.directive('customOnChange', function() {
  return {
    restrict: 'A',
    link: function (scope, element, attrs) {
      var onChangeHandler = scope.$ctrl[attrs.customOnChange];
      element.bind('change', onChangeHandler);
    }
  };
})

.component('missions', missionsComponent)

.name;

export default missionsModule;
