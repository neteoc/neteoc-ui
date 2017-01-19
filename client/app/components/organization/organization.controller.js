import $ from 'jquery';

class OrganizationController {

  constructor($http) {
    this.name = 'organization';
    this.$http = $http;

    this.getOrganizations();

    $(document).ready(function() {
        $('#orglisttable').DataTable();
    } );
  }

  getOrganizations = () => {

    let vm = this;
    this.$http.get('https://mockapi.neteoc.com/organizations/').then(function(response) {

      angular.extend(vm, {
        organizations: response.data
      });
    });
  }

  createOrg = () => {

    // TODO: Go to API

    this.orgs.push({
      _id: 3,
      name: "new org",
      description: "this is the only new org you will ever create"
    })

    $('#orglisttable').DataTable();
  }

/*
        let createOrg = function() {
          Org.save(neworg).$promise.then(function(neworg){
            getOrgs();
          })
        };
        */
}

OrganizationController.$inject = ['$http'];
export default OrganizationController;
