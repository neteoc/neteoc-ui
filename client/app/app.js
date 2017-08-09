import angular from 'angular';
import uiRouter from 'angular-ui-router';
import Common from './common/common';
import Components from './components/components';
import AppComponent from './app.component';
import 'normalize.css';
import $ from 'jquery';
import jQuery from 'jquery';
import ngmap from 'ngmap';
import angularuibootstrap from 'angular-ui-bootstrap';
require('angular-environment-config');



window.$ = $;
window.jQuery = jQuery;

angular.module('app', [
    uiRouter,
    Common,
    Components,
    ngmap,
    angularuibootstrap,
    'luminous.environment'
  ])
  .config(($appEnvironmentProvider, $locationProvider) => {
    "ngInject";
    // @see: https://github.com/angular-ui/ui-router/wiki/Frequently-Asked-Questions
    // #how-to-configure-your-server-to-work-with-html5mode
    $locationProvider.html5Mode(true).hashPrefix('!');

     $appEnvironmentProvider.addEnvironment('local', ['127.0.0.1', 'localhost', /\.local$/i], {
            apiUrl: 'http://localhost:3000/',
     });

     $appEnvironmentProvider.addEnvironment('test', ['test.neteoc.com'], {
            apiUrl: 'https://nkqre3h3me.execute-api.us-east-1.amazonaws.com/dev/',
     });

     $appEnvironmentProvider.addEnvironment('prod', ['app.neteoc.com'], {
            apiUrl: 'https://zfkwm9k5xb.execute-api.us-east-1.amazonaws.com/prod/',
     });
  })

  .component('app', AppComponent);
