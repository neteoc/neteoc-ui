class MissionDetailController {
  constructor($stateParams, MissionService) {

    this.missionId = $stateParams.missionId;

    this.getMission(MissionService);
  }

  getLocalId = () => {

    // if is GSDF, return gsdf_id
    // if is another branch, return their id
    // needs a default ...
    return this.mission.gsdf_id;
  }

  getMission = (MissionService) => {

    var $ctrl = this;
    this.mission = {};

    MissionService.then(function(result) {

      var missions = result || JSON.parse(localStorage.getItem("missions"));

      var mission = missions[$ctrl.missionId];
      if(!('staff' in mission)) mission.staff = {};

      mission.staffLength = Object.keys(mission.staff).length;
      mission.needsStaff = Object.keys(mission.staff).length < mission.staffMax;

      $ctrl.mission = mission;
    });
  }
}

MissionDetailController.$inject = ['$stateParams', 'Mission'];

export default MissionDetailController;
