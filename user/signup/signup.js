'use strict';

module.exports = function(parentModule) {

    var TemplateUrl = require('!ngtemplate?requireAngular!html!./../html/signup.html');



    parentModule
        .controller('User.SignUpPageController', ['$scope', '$http', function($scope, $http) {


            let vm = this;
            let title = "Sign Up";


            angular.extend(this, {
                title: title
            });
        }]);
};
