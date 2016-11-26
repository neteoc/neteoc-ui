import {hawtioPluginLoader } from 'adminjs-core';

var Admin;
(function (Admin) {



    Admin.pluginName = 'Admin';
    Admin.templatePath = '';

    Admin._module = angular.module(Admin.pluginName, ['http-auth-interceptor', require('angular-cookies'), require('angular-resource'), 'UserPlugin']);

    Admin.tab = undefined;


    // import Routes
    Admin.AdminRoutes = require('./admin.routes.js')(Admin);

    //console.log('meep');

    Admin.AdminService = require('./admin.services.js')(Admin);



    Admin.AdminControllers = require('./admin.controllers.js')(Admin);

    Admin._module.run(['HawtioNav', '$rootScope', '$location', 'Session', function(HawtioNav, $rootScope, $location, Session) {
        Session.get().$promise.then(function(session){
           console.log('session on admin run', session);
            if (session.isSiteAdmin){
                console.log('Is site admin? ', session.isSiteAdmin);

                HawtioNav.add(Admin.tab);

            }
        });

    }]);


    hawtioPluginLoader.addModule(Admin.pluginName);



})(Admin || (Admin = {}));


module.exports = Admin;
