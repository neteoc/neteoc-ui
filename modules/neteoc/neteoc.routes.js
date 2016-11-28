'use strict';

module.exports = function(parentModule) {

    var templateUrl = require('!ngtemplate?requireAngular!html!./html/home.html');

    parentModule._module
        .config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider ) {

            $locationProvider.html5Mode(true);
            $routeProvider
                .otherwise({
                    templateUrl:  templateUrl
                });


        }]);

};
