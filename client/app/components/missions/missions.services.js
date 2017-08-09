
class mission {
  constructor() { }
}

  // TOOD: extract url to global var
let MissionFactory = function ($appEnvironment) {

  console.log($appEnvironment.config.apiUrl)

  const missionServiceUrl = $appEnvironment.config.apiUrl;
  // const missionServiceUrl = "http://localhost:3000/";

  return {

    url: missionServiceUrl,

    getMissions: function() {
      return $.ajax({
      async: false,
      headers: {"Authorization": 'bearer ' + localStorage.getItem("id_token")},
      url: missionServiceUrl,
    })},

    signUp: function(missionId, userId) {
      return $.ajax({
        headers: {"Authorization": 'bearer ' + localStorage.getItem("id_token")},
        url: missionServiceUrl + missionId,
        method: "POST",
        data: userId
    })}
  }
};

export default MissionFactory;
