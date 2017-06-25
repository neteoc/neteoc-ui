class MissionsController {
  constructor(Mission) {
    this.name = 'missions';
    this.missions = Mission
    
    this.eligibleMissionsGrid = {
      appScopeProvider: this,
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
        cellTemplate: '<div class="ui-grid-cell-contents ng-binding ng-scope">' 
          + '<button class="button" ng-click="grid.appScope.signUpForMission(row.entity.id)">'
          + 'Sign Up</button></div>'
      }]
    };

    this.newMission = {};
  }
  // TODO: Fix the ng-click in the "Sign Up" column ...

  gridFunctions = {
    signUpForMission : function(missionId) {
      alert(missionId);
    }
  }

  createMission = () => {
    this.missions.attendingMissions.push(this.newMission);

    localStorage.setItem("missions", JSON.stringify(this.missions));

    this.newMission = {};
  }
}

MissionsController.$inject = ['Mission'];
export default MissionsController;
