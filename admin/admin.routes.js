'use strict';

module.exports = function(parentModule) {

    var IndextemplateUrl = require('!ngtemplate?requireAngular!html!./html/admin.index.html');
    var ApprovetemplateUrl = require('!ngtemplate?requireAngular!html!./html/admin.approve.html');



    parentModule._module.config(['$routeProvider', 'HawtioNavBuilderProvider', '$locationProvider', function ($routeProvider, builder, $locationProvider) {
        $locationProvider.html5Mode(true);
        parentModule.tab = builder.create()
            .id(parentModule.pluginName)
            .title(function () {
                return 'Admin';
            })
            .href(function () {
                return '/ui/Admin';
            })
            .subPath('Admin', 'index', IndextemplateUrl)
            .subPath('Approve', 'approve', ApprovetemplateUrl)
            .build();
        builder.configureRouting($routeProvider, parentModule.tab);



/**
        $routeProvider
            .when("/admin/", {
                templateUrl : listTemplateUrl
            })
 **/


    }]);

};