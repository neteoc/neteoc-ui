class MissionsController {
  constructor(MissionService, $http, $timeout) {
    
    let $ctrl = this;
    this.$http = $http;
    this.MissionService = MissionService;
    this.$timeout = $timeout;

    this.attendingMissions = [];
    this.eligibleMissions = [];

    $http.defaults.headers.common.Authorization = 'bearer ' + localStorage.getItem("id_token");

    this.fetchMissions();
    
    this.eligibleMissionsGrid = {
      data: '$ctrl.eligibleMissions',  
      enableRowHashing: false,
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

    this.newMission = {
      startDate: new Date(),
      endDate: new Date(),
      attachments: {}
    };

    this.startDatePoppedUp = false;

    this.dateOptions = {
      maxDate: new Date(2020, 5, 22),
      minDate: new Date(),
      startingDay: 1
    };

    this.endDateOptions = {
      dateDisabled: endDateDisabled,
      formatYear: 'yy',
      maxDate: new Date(2020, 5, 22),
      minDate: new Date(),
      startingDay: 1
    };

    function endDateDisabled(data) {

      return data.date < $ctrl.newMission.startDate;
    }
  }

  fetchMissions = () => {

    let $ctrl = this;

    this.$http.get(this.MissionService.url).then(function(result) {

      var storedMissions = result.data || JSON.parse(localStorage.getItem("missions"));
        
      var profile = JSON.parse(localStorage.getItem("profile"));

      for(var missionId in storedMissions) {

        var mission = storedMissions[missionId];

        if(mission.staff && profile.neteoc_id in mission.staff) {
          $ctrl.attendingMissions.push(mission);
        } else {
          $ctrl.eligibleMissions.push(mission);
        }
      }

      // Reassign the angular bindings, since apparently (angular) ui-grid doesn't do angular bindings *eyeroll*
      $ctrl.eligibleMissionsGrid.data = $ctrl.eligibleMissions;
      $ctrl.attendingMissionsGrid.data = $ctrl.attendingMissions;
    });
  }

  missionClick = (row) => {

    window.location.href = "/missions/" + row.entity.id;
  }

  attachmentAdded = (event) => {

    var vm = this;

    var files = event.target.files;

    var reader = new FileReader();
    var fileName = files[0].name;

    reader.onload = function(frEvent) {

      vm.$timeout( function(){
          vm.newMission.attachments[fileName] = frEvent.target.result;
      }, 5);

      document.getElementById("newAttachment").value = '';
    }

    reader.readAsDataURL(files[0]);
  }

  createMission = () => {

    this.newMission.id_gsdf = this.newMission.id;
    this.newMission.id = this.generateUUID();

    var attachments = this.newMission.attachments;
    delete this.newMission.attachments;

    this.eligibleMissions.push(this.newMission);

    localStorage.setItem("missions", JSON.stringify(this.missions));

    this.$http({
      url: this.MissionService.url,
      method: "POST",
      data: JSON.stringify(this.newMission)
    }).then(function successCallback(response) {
      console.log(response);
    }, function errorCallback(response) {
      console.log(response);
    });

    this.$http({
        method: 'POST',
        url: this.MissionService.url + this.newMission.id + '/attachments',
        data: {
            uploads: attachments
        }
      })
      .success(function (data) {
        console.log(data);
      })
      .error(function (data, status) {
        console.log(data);
      });

    this.newMission = {
      startDate: new Date(),
      endDate: new Date(),
      attachments: {}
    };

    jQuery("#missionModal").modal('hide');
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
