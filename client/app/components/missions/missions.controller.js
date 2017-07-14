class MissionsController {
  constructor(MissionService, $http, $timeout) {
    
    var $ctrl = this;
    this.$http = $http;

    this.attendingMissions = [];
    this.eligibleMissions = [];

    this.$http.get(MissionService.url).then(function(result) {

      console.log(result);

      var storedMissions = result.data || JSON.parse(localStorage.getItem("missions"));

      var attendingMissions = [];
      var eligibleMissions = [];
        
      var profile = JSON.parse(localStorage.getItem("profile"));

      for(var missionId in storedMissions) {

        var mission = storedMissions[missionId];

        if(mission.staff && profile.neteoc_id in mission.staff) {
          $ctrl.attendingMissions.push(mission);
        } else {
          $ctrl.eligibleMissions.push(mission);
        }
      }

      $timeout(function() {
        $ctrl.missions = { attendingMissions, eligibleMissions };
      }, 1);
    });
    
    this.eligibleMissionsGrid = {
      data: '$ctrl.eligibleMissions',      
      rowTemplate: '<div ng-click="grid.appScope.$ctrl.missionClick(row)" ng-repeat="(colRenderIndex, col) in colContainer.renderedColumns track by col.uid" class="ui-grid-cell" ng-class="col.colIndex()" ui-grid-cell></div>',
      columnDefs: [{
        name: 'Name',
        cellTemplate: '<div class="ui-grid-cell-contents ng-binding ng-scope" title="{{row.entity.id}}">{{row.entity.title}}</div>'
      }, {
        name: 'Location',
        field: 'location'
      }, {
        name: 'Start Date',
        field: 'startDate'
      }]
    };
    
    this.attendingMissionsGrid = {
      data: '$ctrl.attendingMissions',
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
    // TODO:
    // this.missions.eligibleMissions.push(this.newMission);

    localStorage.setItem("missions", JSON.stringify(this.missions));

    //$ctrl.$http.post($ctrl.MissionService.url, JSON.stringify(this.newMission))

    this.$http({
      url: "https://1g3aj59907.execute-api.us-east-1.amazonaws.com/dev/",
      method: "POST",
      data: JSON.stringify(this.newMission)
    }).then(function successCallback(response) {
      console.log(response);
  }, function errorCallback(response) {
      console.log(response);
  });

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

MissionsController.$inject = ['Mission', '$http', '$timeout'];
export default MissionsController;
