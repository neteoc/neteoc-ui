class MissionDetailController {
  constructor($stateParams, MissionService, AuthService, $http) {

    this.$http = $http;
    this.MissionService = MissionService;
    this.AuthService = AuthService;

    this.missionId = $stateParams.missionId;
    this.signedUpAlready = false;

    this.userProfile = JSON.parse(localStorage.getItem("profile"));

    this.getMission();
  }

  getLocalId = () => {

    // if is GSDF, return gsdf_id
    // if is another branch, return their id
    // needs a default ...
    return this.mission.gsdf_id;
  }

  getMission = () => {

    var $ctrl = this;
    this.mission = {};

    this.MissionService.getMissions().then(function(result) {

      var missions = result || JSON.parse(localStorage.getItem("missions"));

      $ctrl.mission = missions[$ctrl.missionId];

      $ctrl.getStaff();

      $ctrl.getAttachments();
    });
  }

  getStaff = () => {

    var mission = this.mission;

    if(!('staff' in mission)) mission.staff = {};

    mission.staffLength = Object.keys(mission.staff).length;

    if(!('staffMax' in mission)) {
      mission.needsStaff = true;
    } else {
      mission.needsStaff = Object.keys(mission.staff).length < mission.staffMax;
    }

    if(this.userProfile.neteoc_id in mission.staff) {
      this.signedUpAlready = true;
    }

    for(var index in mission.staff) {

      this.AuthService.getUser(index, this.updateStaff);
    }
  }

  getAttachments = () => {  

    var $ctrl = this;

    this.$http.get(this.MissionService.url + this.mission.id + "/attachments").then(function(result) {

      $ctrl.mission.attachments = result.data;
    });
  }

  updateStaff = (user) => {

    this.mission.staff[user.id] = user;
  }

  signUp = () => {

    this.mission.staff[this.userProfile.neteoc_id] = {
      name: this.userProfile.name
    }
    this.mission.staffLength = Object.keys(this.mission.staff).length;

    this.MissionService.signUp(this.missionId, this.userProfile.neteoc_id);
    
    this.signedUpAlready = true;
  }

  unSignUp = () => {

    alert("Functionality not yet implemented. You're staying signed up for now, soldier.");
  }
}

MissionDetailController.$inject = ['$stateParams', 'Mission', 'AuthService', '$http'];

export default MissionDetailController;
