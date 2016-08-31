import {hawtioPluginLoader } from 'adminjs-core';

var User;
(function (User) {


  let poptastic = function(url) {
      var newWindow = window.open(url, 'name', 'height=600,width=450');
      if (window.focus) {
        newWindow.focus();
      }
    };


  User.pluginName = 'UserPlugin';
  User.templatePath = '';

  User._module = angular.module(User.pluginName, ['http-auth-interceptor', require('angular-cookies'), require('angular-resource')]);

  User.tab = undefined;


  // import Routes
  require('./user.routes.js')(User);

  User._module.run(['HawtioNav', '$rootScope', '$location', function(HawtioNav, $rootScope, $location) {
    // On catching 401 errors, redirect to the login page.



    //  $rootScope.$on('event:auth-loginRequired', openLoginForm);
    HawtioNav.add(User.tab);
  }]);


  //console.log('meep');

  User.UserService = require('./user.services')(User._module);


  User.AuthService = require('./auth.service')(User._module);


  require('./user.controllers')(User);




  User.PageController = User._module.controller('User.PageController', ['Session', 'User', function(Session, User) {
      let vm = this;
      let title = "Users";

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

  User.LoginPageController = User._module.controller('User.LoginPageController', ['$scope', '$http', function($scope, $http) {
      let vm = this;
      let title = "Users";


      angular.extend(this, {
        title: title
      });
    }]);

  User.MenuController = User._module.controller('User.MenuController', ['$scope', '$http', 'Auth', '$location', function($scope, $http, Auth, $location) {
      let vm = this;
      let title = "Users";

      Auth.currentUser();

      let openLoginForm = function() {
        //$location.path('/Flares/login/login');
        $('#myModal').modal({backdrop: 'static',
        keyboard: false});
        $('#myModal').modal('show');
        $('#myModal').on('hide.bs.modal', function(e) {
            e.preventDefault();
          });

        console.log("got 401------------------------------")
        //poptastic('/auth/google');
        return false;
      };

      let logout = function() {
        Auth.logout(function(err) {
          if(!err) {
            $location.path('/');
            //openLoginForm();
          }
        });
      };


      angular.extend(this, {
        title: title,
        poptastic: poptastic,
        logout: logout,
        openLoginForm: openLoginForm
      });
    }]);

  hawtioPluginLoader.addModule(User.pluginName);
})(User || (User = {}));


module.exports = User;
