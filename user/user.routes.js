'use strict';

module.exports = function(parentModule) {

    var signupTemplateUrl = require('!ngtemplate?requireAngular!html!./html/signup.html');
    var templateUrl = require('!ngtemplate?requireAngular!html!./html/user.html');
    var loginTemplateUrl = require('!ngtemplate?requireAngular!html!./html/login.html');
    var accountTemplateUrl = require('!ngtemplate?requireAngular!html!./html/account.html');
    var listsTemplateUrl = require('!ngtemplate?requireAngular!html!./html/lists.html');



    parentModule._module
        .config(['$routeProvider', 'HawtioNavBuilderProvider', '$locationProvider', function($routeProvider, builder, $locationProvider ) {
            $locationProvider.html5Mode(true);
            $routeProvider
                .when('/', {
                    templateUrl:  loginTemplateUrl ,
                    controller: parentModule.loginPageController
                });
            parentModule.tab = builder.create()
                .id(parentModule.pluginName)
                .title(function () { return 'Profile'; })
                .href(function() { return '/Flares/user'; })
                .subPath('Profile', 'profile', templateUrl)
                .subPath('Account', 'account', accountTemplateUrl)
                .subPath('Lists', 'lists', listsTemplateUrl)
                .build();
            builder.configureRouting($routeProvider, parentModule.tab);
            var interceptor = ['$rootScope', '$q', "Base64", function(scope, $q, Base64) {
                function success(response) {
                    return response;
                }

                function error(response) {
                    var status = response.status;
                    if (status == 401) {
                        //AuthFactory.clearUser();
                        //console.log("got 401------------------------------");
                        //window.location = "/account/login?redirectUrl=" + Base64.encode(document.URL);
                        return;
                    }
                    // otherwise
                    return $q.reject(response);
                }
                return function(promise) {
                    return promise.then(success, error);
                }
            }];
        }]);

};