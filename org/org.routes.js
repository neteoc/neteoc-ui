'use strict';

module.exports = function(parentModule) {

    var IndextemplateUrl = require('!ngtemplate?requireAngular!html!./html/org.index.html');
    var DetailstemplateUrl = require('!ngtemplate?requireAngular!html!./html/org.details.html');
    var InvitetemplateUrl = require('!ngtemplate?requireAngular!html!./html/org.invite.html');



    parentModule._module.config(['$routeProvider', 'HawtioNavBuilderProvider', '$locationProvider', function ($routeProvider, builder, $locationProvider) {
        $locationProvider.html5Mode(true);
        parentModule.tab = builder.create()
            .id(parentModule.pluginName)
            .title(function () {
                return 'Org';
            })
            .href(function () {
                return '/ui/org';
            })
            .subPath('Org', 'index', IndextemplateUrl)
            .build();
        builder.configureRouting($routeProvider, parentModule.tab);




         $routeProvider
         .when("/ui/org/:id", {
             templateUrl : DetailstemplateUrl
         })
         .when("/ui/org/:orgid/invite/:inviteid", {
             templateUrl : InvitetemplateUrl
         });



    }]);

};
