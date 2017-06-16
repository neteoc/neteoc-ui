class ListsController {
  constructor($http) {
    this.name = 'lists';
    this.$http = $http;

    this.newList = {};

  // TODO: This ain't right. Auth service or something, right?
  var authToken = localStorage.getItem('id_token');
  $http.defaults.headers.common.Authorization = 'bearer ' + authToken;
    this.userId = localStorage.getItem('neteoc_id');

    this.getAvailableLists();
    this.getOrganizations();

    this.listsGrid = {
      data: '$ctrl.lists',
      columnDefs: [{
        name: 'Name',
        field: 'name'
      }, {
        name: 'Description',
        field: 'description'
      }, {
        name: ' ',
        // TODO: If owner, have button to add users to list ...
        cellTemplate: '<div><button ng-click="grid.appScope.organizationDetails(row.entity.id)">Details</button></div>'
      }]
    };
  }

  getAvailableLists = () => {

    let vm = this;
    this.$http.get('http://54.172.225.43:55142/users/' + this.userId + "/flaregroups").then(function(response) {

      angular.extend(vm, {
        lists: response.data
      });
    });
  }

  getOrganizations = () => {

    let vm = this;
    this.$http.get('http://54.172.225.43:54362/users/' + this.userId + '/organizations/').then(function(response) {

      angular.extend(vm, {
        organizations: response.data
      });
    });
  }

  createList = () => {

    this.newList.ownerId = this.userId;
    this.newList.organizationId = this.selectedOrganization.id;

    let vm = this;
    this.$http.post('http://54.172.225.43:55142/flaregroups', this.newList).then(function(response) {

        console.log(response.data);
        vm.getAvailableLists();
    });
  }
}

ListsController.$inject = ['$http'];
export default ListsController;
