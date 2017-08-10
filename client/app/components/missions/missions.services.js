
class mission {
  constructor() { }
}

  // TOOD: extract url to global var
let MissionFactory = function ($appEnvironment, $http) {

  $http.defaults.headers.common.Authorization = 'bearer ' + localStorage.getItem("id_token");

  const missionServiceUrl = $appEnvironment.config.apiUrl;

  return {

    url: missionServiceUrl,

    getMissions: function() {

      return $http.get(missionServiceUrl);
    },

    signUp: function(missionId, userId) {

      return $http.post(missionServiceUrl + missionId + "/attend", userId);
    },

    getAttachments: function(missionId) {

      return $http.get(missionServiceUrl + missionId + "/attachments");
    },

    createMission: function(newMission) {

      return $http.post(missionServiceUrl, JSON.stringify(newMission));
    },

    postAttachments: function(missionId, attachments) {

      return $http.post(missionServiceUrl + missionId + "/attachments", {"uploads": attachments});
    }
  }
};

export default MissionFactory;
