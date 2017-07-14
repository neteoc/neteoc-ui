
class mission {
  constructor() { }
}

  // TOOD: extract url to global var
let MissionFactory = function () {

  const missionServiceUrl = "https://1g3aj59907.execute-api.us-east-1.amazonaws.com/dev/";

  return {

    url: missionServiceUrl,

    getMissions: function() {
      return $.ajax({
      async: false,
      url: missionServiceUrl,
    })},

    signUp: function(missionId, userId) {
      return $.ajax({
        url: missionServiceUrl + missionId,
        method: "POST",
        data: userId
    })}
  }
};

export default MissionFactory;
