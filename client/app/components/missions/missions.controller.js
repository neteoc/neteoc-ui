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
    
    this.attendingMissionsGrid = {
      data: '$ctrl.missions.attendingMissions',
      rowTemplate: '<div ng-click="grid.appScope.$ctrl.missionClick(row)" ng-repeat="(colRenderIndex, col) in colContainer.renderedColumns track by col.uid" class="ui-grid-cell" ng-class="col.colIndex()" ui-grid-cell></div>'
    }    

    this.newMission = {};

    this.startDatePoppedUp = false;

    this.dateOptions = {
      formatYear: 'yy',
      maxDate: new Date(2020, 5, 22),
      minDate: new Date(),
      startingDay: 1
    };
  }

  missionClick = (row) => {
    
    if(!row.entity.guid) row.entity.guid = "someGooed";

    window.location.href = "/missions/" + row.entity.guid;
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

    this.newMission = {
      startDate: new Date(),
      endDate: new Date()
    };
  }
}

MissionsController.$inject = ['Mission'];
export default MissionsController;
