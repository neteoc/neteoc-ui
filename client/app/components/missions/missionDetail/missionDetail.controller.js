class MissionDetailController {
  constructor() {
    this.name = 'missionDetail';

    this.missionId = $stateParams.missionId;

    var missions = JSON.parse(localStorage.getItem("missions"));
  }
}

export default MissionDetailController;
