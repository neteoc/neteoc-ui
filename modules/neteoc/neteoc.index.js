'use strict';

import {hawtioPluginLoader } from 'adminjs-core';

require('angular-environment-config');

//import {environment} from 'angular-environment';

var NetEOC;
(function (NetEOC) {
    NetEOC.pluginName = 'NetEOC';
    NetEOC.templatePath = '';




    NetEOC._module = angular.module(NetEOC.pluginName, ['luminous.environment']);

    NetEOC._module.config(['$appEnvironmentProvider', function($appEnvironmentProvider) {

        $appEnvironmentProvider.addEnvironment('local', ['127.0.0.1', 'localhost', /\.local$/i], {
            apiUrl: 'http://localhost:8888/mockapi/'
        });

        $appEnvironmentProvider.addEnvironment('test', ['test.neteoc.com'], {
            apiUrl: 'https://mockapi.neteoc.com/'
        });

        $appEnvironmentProvider.addEnvironment('Production', ['app.neteoc.com'], {
            apiUrl: 'https://mockapi.neteoc.com/'
        });


    }]);

    //require('./neteoc.services.js')(NetEOC);
    NetEOC.routes = require('./neteoc.routes.js')(NetEOC);
    NetEOC.controllers = require('./neteoc.controllers.js')(NetEOC);


    NetEOC._module.run(['HawtioNav', function(HawtioNav) {


    }]);


    hawtioPluginLoader.addModule(NetEOC.pluginName);
})(NetEOC || (NetEOC = {}));


module.exports = NetEOC;
