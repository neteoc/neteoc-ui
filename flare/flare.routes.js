'use strict';

module.exports = function(parentModule) {

    var IndextemplateUrl = require('!ngtemplate?requireAngular!html!./html/index.html');
    var templateUrl = require('!ngtemplate?requireAngular!html!./html/flare.html');
    var listTemplateUrl = require('!ngtemplate?requireAngular!html!./html/lists.html');
    var listDetailsTemplateUrl = require('!ngtemplate?requireAngular!html!./html/listdetail.html');
    var msgDetailsTemplateUrl = require('!ngtemplate?requireAngular!html!./html/flare.msgdetail.html');


    parentModule._module.config(['$routeProvider', 'HawtioNavBuilderProvider', '$locationProvider', function ($routeProvider, builder, $locationProvider) {
        $locationProvider.html5Mode(true);
        parentModule.tab = builder.create()
            .id(parentModule.pluginName)
            .title(function () {
                return 'Flare';
            })
            .href(function () {
                return '/Flare/';
            })
            .subPath('Flares', 'flares', templateUrl)
            .subPath('Lists', 'lists', listTemplateUrl)
            .build();
        builder.configureRouting($routeProvider, parentModule.tab);




        $routeProvider
            .when("/Flare/list", {
                templateUrl : listTemplateUrl
            })
            .when("/Flare/list/:id", {
                templateUrl : listDetailsTemplateUrl
            })
            .when("/Flare/message", {
                templateUrl : templateUrl
            })
            .when("/Flare/message/:id", {
                templateUrl : msgDetailsTemplateUrl
            });


    }]);

};