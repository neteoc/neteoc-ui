import $ from 'jquery';

class OrganizationController {

  constructor($http, $scope) {
    this.name = 'organization';
    this.$http = $http;

    this.newOrganization = {};
    
  var authToken = localStorage.getItem('id_token');
  $http.defaults.headers.common.Authorization = 'bearer ' + authToken;

  // TODO: This ain't right
    this.userId = localStorage.getItem('neteoc_id');

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
    this.$http.get('http://54.172.225.43:54362/users/' + this.userId + '/organizations/').then(function(response) {

      angular.extend(vm, {
        organizations: response.data
      });
    });
  }

  createOrganization = () => {

    this.newOrganization.ownerId = this.userId;

    let vm = this;
    this.$http.post('http://54.172.225.43:54362/organizations', this.newOrganization).then(function(response) {

        vm.organizations.push(response.data);
    });
  }
}

OrganizationController.$inject = ['$http', '$scope'];
export default OrganizationController;
