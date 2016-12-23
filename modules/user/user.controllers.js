'use strict';

module.exports = function(parentModule) {

    parentModule.AccountPageController = parentModule._module.controller('User.AccountPageController', ['$scope', '$http', 'Account', function($scope, $http, Account) {
        let vm = this;
        let title = "Users";

        let accountinfo = Account.get(function (accountinfo){

            });




        angular.extend(this, {
            title: title,
            accountinfo: accountinfo
        });
    }]);

    parentModule.ListPageController = parentModule._module.controller('User.ListPageController', ['$scope', '$http', function($scope, $http) {
        let vm = this;
        let title = "Lists";

        console.log('hello');

        angular.extend(this, {
            title: title
        });
    }]);

    parentModule.PageController = parentModule._module.controller('User.PageController', [ 'User', 'authService', function(User, authService) {
        let vm = this;
        let title = "Users";

        authService.getProfileDeferred().then(function (profile) {
            angular.extend(vm, {
                profile: profile
            });
        });





            angular.extend(vm, {
              title: title,
              authService: authService
            });
    }]);

    parentModule.LoginPageController = parentModule._module.controller('User.LoginPageController', ['$scope', '$http', function($scope, $http) {
      let vm = this;
      let title = "Users";


      angular.extend(this, {
        title: title
      });
    }]);

    parentModule.MenuController = parentModule._module.controller('User.MenuController', ['$scope', '$http', '$location', '$rootScope', 'authService', function($scope, $http, $location, $rootScope, authService) {
      let vm = this;
      let title = "Users";
      let subTitle = "SubMenu";
      //vm.authService = authService;
      //  console.log(authService);

      $rootScope.isAuthenticated = localStorage.getItem('isAuthenticated');

      subTitle = $location.search()['main-tab'];

      $rootScope.$on("$routeChangeSuccess", function(event, next, current) {
        vm.subTitle = next.params['main-tab'];
      });

      let openLoginForm = function() {
        //$location.path('/Flares/login/login');
        $('#myModal').modal({backdrop: 'static',
        keyboard: false});
        $('#myModal').modal('show');
        $('#myModal').on('hide.bs.modal', function(e) {
            e.preventDefault();
          });
        return false;
      };

      let logout = function() {

      };


      angular.extend(this, {
        title: title,
        logout: logout,
        openLoginForm: openLoginForm,
        subTitle: subTitle,
        authService: authService
      });
    }]);

};
