class FlareController {
  constructor(Auth, $http) {
    this.user = Auth.getProfile()
    this.name = 'flare';
    this.$http = $http;

    this.getOrganizationDetails(1);

    console.log(this.organization);
  }

  getOrganizationDetails = (organizationId) => {

    let vm = this;
    // TODO: unmockify
    this.$http.get('https://mockapi.neteoc.com/org/123456789/').then(function(response) {

      angular.extend(vm, {
        organization: response.data
      });
    });
  }
}

FlareController.$inject = ['Auth', '$http'];
export default FlareController;
