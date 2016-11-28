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

    parentModule.PageController = parentModule._module.controller('User.PageController', ['Session', 'User', function(Session, User) {
              let vm = this;
              let title = "Users";
              let getUser = function () {
                  Session.get().$promise.then(function (sessonuser) {
                      "use strict";

                      User.get({id: sessonuser._id}).$promise.then(function (dbuser) {

                          angular.extend(vm, {
                              user: dbuser
                          });

                      });


                  });
              };


              getUser();


              let updateUser = function () {
                      vm.user.$update(function () {
                          console.log("user updated");
                          getUser();
                      })
              };



            angular.extend(vm, {
              title: title,
              updateUser: updateUser
            });
    }]);

    parentModule.LoginPageController = parentModule._module.controller('User.LoginPageController', ['$scope', '$http', function($scope, $http) {
      let vm = this;
      let title = "Users";


      angular.extend(this, {
        title: title
      });
    }]);

    parentModule.MenuController = parentModule._module.controller('User.MenuController', ['$scope', '$http', 'Auth', '$location', 'Session', '$rootScope', function($scope, $http, Auth, $location, Session, $rootScope) {
      let vm = this;
      let title = "Users";
      let subTitle = "SubMenu";
      Auth.currentUser();

      subTitle = $location.search()['main-tab']

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

      //Session.query().$promise
      //  .error(function(data) { console.log(data) })
      //  .success(function(data) { console.log(err);  });

      let logout = function() {
        Auth.logout(function(err) {
          if(!err) {
            $location.path('/');
            openLoginForm();
          }
        });
      };


      angular.extend(this, {
        title: title,
        logout: logout,
        openLoginForm: openLoginForm,
        subTitle: subTitle
      });
    }]);

};
