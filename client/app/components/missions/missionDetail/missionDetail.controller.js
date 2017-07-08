class MissionDetailController {
  constructor($stateParams) {
    this.name = 'missionDetail';

    this.missionId = $stateParams.missionId;

    this.mission = this.getMission();

    console.log(this.mission);
  }

  getLocalId = () => {

    // if is GSDF, return gsdf_id
    // if is another branch, return their id
    // needs a default ...
    return this.mission.gsdf_id;
  }

  getMission = () => {

    var missions = JSON.parse(localStorage.getItem("missions"));

    for(var missionType in missions) {
      for(var index in missions[missionType]) {
        if(missions[missionType][index].id == this.missionId) {

          var mission = missions[missionType][index];

          this.getStaff(mission);

          return mission;
        }
      }
    }
  }

  // TODO: service call
  getStaff = (mission) => {

    mission.staff = {
      "someones-guid" : {
        name : "Kerry Hatcher"
      },
      "different-guid" : {
        name : "Darrell Bailey"
      },
      "another-guid" : {
        name : "Eric Wehrly"
      }
    }
    mission.staffLength = Object.keys(mission.staff).length;
    mission.needsStaff = Object.keys(mission.staff).length < mission.staffMax;
  }
}

MissionDetailController.$inject = ['$stateParams'];

export default MissionDetailController;
