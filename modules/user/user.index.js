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

  User.UserService = require('./user.services.js')(User._module);


  User.AuthService = require('./auth.service.js')(User._module);


  User.UserControllers = require('./user.controllers.js')(User);

  hawtioPluginLoader.addModule(User.pluginName);
})(User || (User = {}));


module.exports = User;