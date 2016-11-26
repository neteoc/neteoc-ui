'use strict';

module.exports = function(parentModule) {

    parentModule.AccountPageController = parentModule._module.controller('User.AccountPageController', ['$scope', '$http', 'Account', function($scope, $http, Account) {
    let vm = this;
    let title = "Users";

    let accountinfo = Account.get(function (accountinfo){
        console.log(accountinfo);
        });
        console.log('hello');
        console.log(Account);


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
    




  parentModule.PageController = parentModule._module.controller('User.PageController', ['Session', 'User', 'envService', function(Session, User, envService) {
      let vm = this;
      let title = "Users";
      console.log(envService.get());
      let getUser = function () {
          Session.get().$promise.then(function (sessonuser) {
              "use strict";


              User.get({id: sessonuser._id}).$promise.then(function (dbuser) {

                  console.log(dbuser);
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



    let poptastic = function(url) {
        var newWindow = window.open(url, 'name', 'height=600,width=450');
        if (window.focus) {
          newWindow.focus();
        }
      };

    angular.extend(vm, {
      title: title,
      poptastic: poptastic,
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
        console.log(next.params['main-tab']);
        console.log(vm.subTitle)
        console.log(subTitle)
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