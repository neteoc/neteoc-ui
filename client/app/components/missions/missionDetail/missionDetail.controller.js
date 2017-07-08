class MissionDetailController {
  constructor($stateParams) {
    this.name = 'missionDetail';

    this.missionId = $stateParams.missionId;

    this.mission = this.getMission();

    this.mission.staff = {
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
    this.mission.staffLength = Object.keys(this.mission.staff).length;
    this.mission.needsStaff = Object.keys(this.mission.staff).length < this.mission.staffMax;

    console.log(this.mission);
  }

  getMission = () => {

    var missions = JSON.parse(localStorage.getItem("missions"));

    for(var missionType in missions) {
      for(var index in missions[missionType]) {
        if(missions[missionType][index].id == this.missionId) {
          return missions[missionType][index];
        }
      }
    }
  }
}

MissionDetailController.$inject = ['$stateParams'];

export default MissionDetailController;
