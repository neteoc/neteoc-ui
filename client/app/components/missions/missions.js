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


  .factory('Mission', MissionFactory)


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

.component('missions', missionsComponent)

.directive('myDirective', function() {
  console.log("directive!")
  return {
    restrict: 'A',
    scope: true,
    link: function (scope, element, attrs) {
      element.bind('change', function(){
       var formData = new FormData();
       formData.append('file', element[0].files[0]);

       console.log("here I am")

       // optional front-end logging 
        var fileObject = element[0].files[0];
        scope.fileLog = {
          'lastModified': fileObject.lastModified,
          'lastModifiedDate': fileObject.lastModifiedDate,
          'name': fileObject.name,
          'size': fileObject.size,
          'type': fileObject.type
        };
        scope.$apply();

      });
    }
  };
})

.name;

export default missionsModule;
