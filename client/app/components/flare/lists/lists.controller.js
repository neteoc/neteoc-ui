class ListsController {
  constructor($http) {
    this.name = 'lists';
    this.$http = $http;

    this.getAvailableLists();
    this.getOrganizations();
  }

  getAvailableLists = () => {

    let vm = this;
    this.$http.get('https://mockapi.neteoc.com/lists/').then(function(response) {

      angular.extend(vm, {
        lists: response.data
      });
    });
  }

  getOrganizations = () => {

    let vm = this;
    this.$http.get('https://mockapi.neteoc.com/organizations/').then(function(response) {

      angular.extend(vm, {
        organizations: response.data
      });
    });
  }
}

ListsController.$inject = ['$http'];
export default ListsController;
