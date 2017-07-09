class MissionsController {
  constructor(MissionService) {
    this.name = 'missions';

    MissionService.then(function(result) {

      var storedMissions = result || JSON.parse(localStorage.getItem("missions"));

      console.log(storedMissions);

      if(storedMissions && storedMissions.attendingMissions) {
        attendingMissions = storedMissions.attendingMissions;
      }

      if(storedMissions && storedMissions.eligibleMissions) {
        eligibleMissions = storedMissions.eligibleMissions;
      }

      this.missions = { attendingMissions, eligibleMissions };
    });
    
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

    window.location.href = "/missions/" + row.entity.id;
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
    this.newMission.id_gsdf = this.newMission.id;
    this.newMission.id = this.generateUUID();
    this.missions.attendingMissions.push(this.newMission);

    // TODO: push to API
    localStorage.setItem("missions", JSON.stringify(this.missions));

    this.newMission = {
      startDate: new Date(),
      endDate: new Date()
    };
  }  
  
  generateUUID = () => {
      var d = new Date().getTime();
      if(window.performance && typeof window.performance.now === "function"){
          d += performance.now(); //use high-precision timer if available
      }
      var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
          var r = (d + Math.random()*16)%16 | 0;
          d = Math.floor(d/16);
          return (c=='x' ? r : (r&0x3|0x8)).toString(16);
      });
      return uuid;
  }
}

MissionsController.$inject = ['Mission'];
export default MissionsController;
