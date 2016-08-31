import {hawtioPluginLoader } from 'adminjs-core';



var Flare;
(function (Flare) {
  Flare.pluginName = 'Flare-plugin';
  Flare.templatePath = '';

  Flare._module = angular.module(Flare.pluginName, ['UserPlugin', require('angular-resource'), require('angular-route')]);

  Flare.tab = undefined;
  require('./flare.services')(Flare);
  require('./flare.routes')(Flare);
  require('./flare.controllers')(Flare);

  Flare._module.run(['HawtioNav', '$rootScope', '$location', 'Session', function(HawtioNav, $rootScope, $location, Session) {

    $rootScope.$on('event:auth-loginRequired', function() {
      //$location.path('/Flares/login/login');
      console.log("got 401--------------!!!!!!!!!!!!!!!!!")
      //UserPlugin.poptastic('/auth/google');
      return false;
    });
    Session.get().$promise.then(function(session){
      console.log('session on admin run', session);
      if (session.status == "approved"){
        console.log('Is user approved? ', session.status);

          HawtioNav.add(Flare.tab);

      }
    });

  }]);


  hawtioPluginLoader.addModule(Flare.pluginName);
})(Flare || (Flare = {}));


module.exports = Flare;
