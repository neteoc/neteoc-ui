class OrganizationDetailController {
  constructor($stateParams) {
    this.name = 'organizationDetail';

    this.organizationId = $stateParams.organizationId;

    // TODO: Make sure we're in a valid organization based on id
    this.organizationName = this.organizationId;
  }
}

OrganizationDetailController.$inject = ['$stateParams'];

export default OrganizationDetailController;
