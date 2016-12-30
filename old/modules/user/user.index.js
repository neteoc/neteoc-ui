import {hawtioPluginLoader } from 'adminjs-core';
import 'auth0-lock';
import 'angular-lock';


var User;
(function (User) {

  User.pluginName = 'User';
  User.templatePath = '';

  User._module = angular.module(User.pluginName, ['http-auth-interceptor', require('angular-cookies'), require('angular-resource'), 'auth0.lock', require('angular-jwt')]);

  User.tab = undefined;



  // import Routes
  User.UserRoutes = require('./user.routes.js')(User);

  User._module.run(['HawtioNav', '$rootScope', '$location', 'authService', 'lock', function(HawtioNav, $rootScope, $location, authService, lock) {
    // On catching 401 errors, redirect to the login page.



    //  $rootScope.$on('event:auth-loginRequired', openLoginForm);
    HawtioNav.add(User.tab);


      // Put the authService on $rootScope so its methods
      // can be accessed from the nav bar
      $rootScope.authService = authService;

      // Register the authentication listener that is
      // set up in auth.service.js
      authService.registerAuthenticationListener();

      // Register the synchronous hash parser
      // when using UI Router
      lock.interceptHash();




  }]);

  User.UserService = require('./user.services.js')(User);


  User.AuthService = require('./auth.service.js')(User);


  User.UserControllers = require('./user.controllers.js')(User);

  hawtioPluginLoader.addModule(User.pluginName);
})(User || (User = {}));


module.exports = User;
