
class mission {
  constructor() { }
}

  // TOOD: extract url to global var
let MissionFactory = function () {

  return {

    getMissions: function() {

      return $.ajax({
      async: false,
      url: "https://1g3aj59907.execute-api.us-east-1.amazonaws.com/dev/",
    })},
    signUp: function(missionId, userId) {

      return $.ajax({
        async: false,
        url: "https://1g3aj59907.execute-api.us-east-1.amazonaws.com/dev/" + missionId,
        method: "POST",
        data: userId
    })}
  }
};

export default MissionFactory;
