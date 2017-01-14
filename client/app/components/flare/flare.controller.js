class FlareController {
  constructor(Auth, $http) {
    this.user = Auth.getProfile()
    this.name = 'flare';
    this.$http = $http;

    this.getAvailableLists();
  }

  getAvailableLists = () => {

    let vm = this;
    // TODO: unmockify
    this.$http.get('https://mockapi.neteoc.com/lists/').then(function(response) {

      console.log("Sup");
      console.log(response);

      angular.extend(vm, {
        // lists: response.data
        lists: [
          {
            _id : 1,
            name : "first list"
          },
          {
            _id : 2,
            name : "twoth list"
          }
        ]
      });
    });
  }
}

FlareController.$inject = ['Auth', '$http'];
export default FlareController;
