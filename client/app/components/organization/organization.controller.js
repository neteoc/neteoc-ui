import $ from 'jquery';

class OrganizationController {

  constructor($http, $scope) {
    this.name = 'organization';
    this.$http = $http;

    this.getOrganizations();

    this.organizationGrid = {
      data: '$ctrl.organizations',
      columnDefs: [{
        name: 'Name',
        field: 'name'
      }, {
        name: 'Description',
        field: 'description'
      }, {
        name: ' ',
        // cellTemplate: '<div><button ng-href="/organization/{row.entity._id}">Details</button></div>'
        cellTemplate: '<div><button ng-click="grid.appScope.organizationDetails(row.entity._id)">Details</button></div>'
      }]
    };

    $scope.organizationDetails = function(organizationId) {

      window.location.href = "/organization/" + organizationId;
    }
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
  }

/*
        let createOrg = function() {
          Org.save(neworg).$promise.then(function(neworg){
            getOrgs();
          })
        };
        */
}

OrganizationController.$inject = ['$http', '$scope'];
export default OrganizationController;
