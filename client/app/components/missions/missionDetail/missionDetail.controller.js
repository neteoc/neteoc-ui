class MissionDetailController {
  constructor($stateParams, MissionService) {

    this.MissionService = MissionService;

    this.missionId = $stateParams.missionId;
    this.signedUpAlready = false;

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

      this.getStaff();
    });
  }

  getStaff = () => {

    var mission = $ctrl.mission;

    if(!('staff' in mission)) mission.staff = {};

    mission.staffLength = Object.keys(mission.staff).length;

    if(!('staffMax' in mission)) {
      mission.needsStaff = true;
    } else {
      mission.needsStaff = Object.keys(mission.staff).length < mission.staffMax;
    }

    var profile = JSON.parse(localStorage.getItem("profile"));

    if(profile.neteoc_id in mission.staff) {
      $ctrl.signedUpAlready = true;
    }
  }

  signUp = () => {

    var profile = JSON.parse(localStorage.getItem("profile"));

    this.mission.staff[profile.neteoc_id] = {
      name: profile.name
    }
    this.mission.staffLength = Object.keys(this.mission.staff).length;

    this.MissionService.signUp(this.missionId, profile.neteoc_id);
  }
}

MissionDetailController.$inject = ['$stateParams', 'Mission'];

export default MissionDetailController;
