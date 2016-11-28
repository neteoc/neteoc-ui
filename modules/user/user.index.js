import {hawtioPluginLoader } from 'adminjs-core';

var User;
(function (User) {

  User.pluginName = 'User';
  User.templatePath = '';

  User._module = angular.module(User.pluginName, ['http-auth-interceptor', require('angular-cookies'), require('angular-resource')]);

  User.tab = undefined;


  // import Routes
  User.UserRoutes = require('./user.routes.js')(User);

  User._module.run(['HawtioNav', '$rootScope', '$location', function(HawtioNav, $rootScope, $location) {
    // On catching 401 errors, redirect to the login page.



    //  $rootScope.$on('event:auth-loginRequired', openLoginForm);
    HawtioNav.add(User.tab);
  }]);

  User.UserService = require('./user.services.js')(User);


  User.AuthService = require('./auth.service.js')(User);


  User.UserControllers = require('./user.controllers.js')(User);

  hawtioPluginLoader.addModule(User.pluginName);
})(User || (User = {}));


module.exports = User;
