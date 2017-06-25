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
        cellTemplate: '<button class="button" ng-click="grid.appScope.$ctrl.signUpForMission(row.entity.id)">'
          + 'Sign Up</button>'
      }]
    };

    this.newMission = {};
  }

  signUpForMission = (missionId) => {

    var eligibleMissions = this.missions.eligibleMissions;
    var attendingMissions = this.missions.attendingMissions;

    for(var index in eligibleMissions) {

      if(eligibleMissions[index].id == missionId) {

        attendingMissions.push(eligibleMissions[index]);
        eligibleMissions.splice(index, 1);

        // TODO: push to API
        localStorage.setItem("missions", JSON.stringify(this.missions));
        break;
      }
    }
  }

  createMission = () => {
    this.missions.attendingMissions.push(this.newMission);

    // TODO: push to API
    localStorage.setItem("missions", JSON.stringify(this.missions));

    this.newMission = {};
  }
}

MissionsController.$inject = ['Mission'];
export default MissionsController;
