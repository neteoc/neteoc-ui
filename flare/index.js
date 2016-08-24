import {hawtioPluginLoader } from 'adminjs-core';
import {CreateFlare} from './create';

var IndextemplateUrl = require('!ngtemplate?requireAngular!html!./index.html');
var templateUrl = require('!ngtemplate?requireAngular!html!./flare.html');

var Flare;
(function (Flare) {
  Flare.pluginName = 'Flare-plugin';
  Flare.templatePath = '';

  Flare._module = angular.module(Flare.pluginName, ['UserPlugin']);

  var tab = undefined;

  Flare._module.config(['$routeProvider', 'HawtioNavBuilderProvider', '$locationProvider', function($routeProvider, builder, $locationProvider) {
    $locationProvider.html5Mode(true);
    tab = builder.create()
                 .id(Flare.pluginName)
                 .title(function () { return 'Flare'; })
                 .href(function() { return '/Flare/home'; })
                 .subPath('Home', 'home', IndextemplateUrl)
                 .subPath('Flares', 'flares', templateUrl)
                 .build();
    builder.configureRouting($routeProvider, tab);
  }]);

  Flare._module.run(['HawtioNav', '$rootScope', '$location', function(HawtioNav, $rootScope, $location) {

    $rootScope.$on('event:auth-loginRequired', function() {
      //$location.path('/Flares/login/login');
      console.log("got 401--------------!!!!!!!!!!!!!!!!!")
      //UserPlugin.poptastic('/auth/google');
      return false;
    });
    HawtioNav.add(tab);
  }]);

  //console.log('meep');
  Flare.IndexPageController = Flare._module.controller('Flare.IndexPageController', ['$scope', '$http', function($scope, $http) {
    let vm = this;
    let title = "Home";
    let message = "";
    let newmsg = {};

    
    angular.extend(this, {
      title: title
    });

  }]);


  Flare.CreateController = Flare._module.controller('Flare.CreateController', ['$scope', '$http', function($scope, $http) {
    let vm = this;
    let test = "Send Flare";
    let message = "";
    let newmsg = {};

    let saveflare = function(){
      console.log(newmsg)
      $http({
        method: 'POST',
        url: '/api/message',
        data: newmsg
      })
        .then(function(response){
          console.log(response.data);
          Flare.PageController
        })

    }

    angular.extend(this, {
      test: test,
      message: message,
      saveflare: saveflare,
      newmsg: newmsg
    });

  }]);

  Flare.PageController = Flare._module.controller('Flare.PageController', ['$scope', '$http', function($scope, $http) {
    let vm = this;
    let Flares = {};
    let message = "";

    $http.get("/api/messages")
      .then(function(response) {
          console.log(response);
          vm.data = response.data;
      });

    function openlogin(){
      window.open("/auth/google");
    }

    let title = "Flares";
    angular.extend(this, {
      title: title,
      openlogin: openlogin,
      message: message
    });
  }]);

  hawtioPluginLoader.addModule(Flare.pluginName);
})(Flare || (Flare = {}));


module.exports = Flare;
