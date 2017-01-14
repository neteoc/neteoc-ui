class OrganizationDetailController {
  constructor($stateParams, $http) {

    this.name = 'organizationDetail';
    this.$http = $http;

    this.organizationId = $stateParams.organizationId;

    // TODO: Make sure we're in a valid organization based on id
    this.organizationName = this.organizationId;
    this.organizationDescription = "quiet randall";

    this.getOrganizationDetails($stateParams.organizationId);
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

OrganizationDetailController.$inject = ['$stateParams', '$http'];

export default OrganizationDetailController;
