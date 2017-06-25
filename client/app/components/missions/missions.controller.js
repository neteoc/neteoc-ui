class MissionsController {
  constructor(Mission) {
    this.name = 'missions';
    this.missions = Mission
    
    this.eligibleMissionsGrid = {
      data: '$ctrl.missions.eligibleMissions',
      columnDefs: [{
        name: 'Name',
        cellTemplate: '<div class="ui-grid-cell-contents ng-binding ng-scope" title="{{row.entity.id}}">{{row.entity.title}}</div>'
      }, {
        name: 'Location',
        field: 'location'
      }, {
        name: 'Start Date',
        field: 'startDate'
      }, {
        name: ' ',
        cellTemplate: '<div class="ui-grid-cell-contents ng-binding ng-scope"><button class="button" ng-click="getExternalScopes().signUpForMission(row.entity.id)">Sign Up</button></div>'
      }]
    };
  }

  gridFunctions = {
    signUpForMission : function(missionId) {
      alert(missionId);
    }
  }
}

MissionsController.$inject = ['Mission'];
export default MissionsController;
