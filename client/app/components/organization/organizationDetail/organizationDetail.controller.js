class OrganizationDetailController {
  constructor($stateParams, $http) {

    this.name = 'organizationDetail';
    this.$http = $http;

    // TODO: Make sure we're in a valid organization based on id
    this.organizationId = $stateParams.organizationId;
    
  // TODO: This ain't right. Auth service or something, right?
  var authToken = localStorage.getItem('id_token');
  $http.defaults.headers.common.Authorization = 'bearer ' + authToken;
    this.userId = localStorage.getItem('neteoc_id');

    this.getOrganizationDetails($stateParams.organizationId);

    this.organizationMemberGrid = {
      data: '$ctrl.organization.members',
      columnDefs: [{
        name: 'Name',
        field: 'name'
      }, {
        name: 'Email',
        field: 'email'
      }, {
        name: 'SMS',
        field: 'sms'
      }, {
        name: 'Telephone',
        field: 'phone'
      }, {
        name: 'Action',
        // cellTemplate: '<div><button ng-click="grid.appScope.organizationDetails(row.entity.id)">Details</button></div>'
        cellTemplate: this.someTemplateHTML
      }]
    };
  }

  someTemplateHTML = '<div class="btn-group" role="group">' + 
                        '<button type="button" class="btn btn-default dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">' + 
                            'Actions' + 
                            '<span class="caret"></span>' + 
                        '</button>' + 
                        '<ul class="dropdown-menu">' + 
                            // <! - -<li><a href="#">Remove</a></li>- - >
                            '<li ng-hide="$ctrl.isAdmin(member._id)" ng-click="$ctrl.makeAdmin(member._id)"><a href="#">Make Admin</a></li>' + 
                            '<li ng-show="$ctrl.isAdmin(member._id)" ng-click="$ctrl.removeUser(member._id)"><a href="#">Remove Admin</a></li>' + 
                        '</ul>' +
                    '</div>';

  getOrganizationDetails = (organizationId) => {

    let vm = this;
    this.$http.get('http://54.172.225.43:54362/organizations/' + organizationId).then(function(response) {

      angular.extend(vm, {
        organization: response.data
      });

      // TODO: Could run in parallel if we weren't setting organization value directly above (and set values instead)
      vm.$http.get('http://54.172.225.43:54362/organizations/' + vm.organizationId + '/members').then(function(organizationMembers) {

        vm.organization.members = organizationMembers.data;

        vm.$http.get('http://54.172.225.43:54362/users/' + vm.organization.ownerId).then(function(organizationOwner) {

          console.log(organizationOwner.data);

          vm.organization.members.push(organizationOwner.data);

          console.log(vm.organization);
        });
      });

      vm.$http.get('http://54.172.225.43:54362/organizations/' + vm.organizationId + '/administrators').then(function(organizationAdministrators) {

        vm.organization.administrators = organizationAdministrators.data;
      });
    });
  }
}

OrganizationDetailController.$inject = ['$stateParams', '$http'];

export default OrganizationDetailController;
