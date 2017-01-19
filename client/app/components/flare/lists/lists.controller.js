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

  // TODO: Get from API
  getOrgs = () => {

    let orgs = [
      {
        _id: 1,
        name: "u",
        description: "none of u bidness"
      },
      {
        _id: 2,
        name: "me",
        description: "likes puppies"
      }
    ];
    return orgs;
  }
}

ListsController.$inject = ['$http'];
export default ListsController;
