class FlareController {
  constructor(Auth, $http) {
    this.user = Auth.getProfile()
    this.name = 'flare';
    this.$http = $http;

    this.newMessage = {};

    this.getAvailableLists();
  }

  getAvailableLists = () => {

    let vm = this;
    this.$http.get('https://mockapi.neteoc.com/lists/').then(function(response) {

      angular.extend(vm, {
        lists: response.data
      });
    });
  }

  sendFlare = () => {
    
    console.log("Sending flare");
    console.log(this.newMessage);
    console.log(this.selectedList);

    // on success
    this.newMessage = {};
  }
}

FlareController.$inject = ['Auth', '$http'];
export default FlareController;
