
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

  const attendingMissions = [];
  const eligibleMissions = [exampleMission];


  return { attendingMissions, eligibleMissions };
};



//MenuFactory.$inject = ['Auth']
export default MissionFactory;
