
class mission {
  constructor() {

  }

}

let exampleMission = {
  id: "SAD 345 678",
  title: "Look for dude",
  location: "Stone Mtn",
  startDate: "01JAN2016",
  endDate: "03JAN2016",
  dutyLevel: "1",
  staffNeeded: 15,
  staffRegistred: 9,
  staffMax: 99,
};

let MissionFactory = function () {

  let attendingMissions = [];
  let eligibleMissions = [exampleMission];

  // TODO: load from API
  let storedMissions = JSON.parse(localStorage.getItem("missions"));

  if(storedMissions && storedMissions.attendingMissions) {
    attendingMissions = storedMissions.attendingMissions;
  }

  if(storedMissions && storedMissions.eligibleMissions) {
    eligibleMissions = storedMissions.eligibleMissions;
  }

  return { attendingMissions, eligibleMissions };
};



//MenuFactory.$inject = ['Auth']
export default MissionFactory;
