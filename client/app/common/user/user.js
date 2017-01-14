import angular from 'angular';
import AuthService from './auth.service';


require('angular-lock');
require("angular-http-auth");

let modDeps = [
  'auth0.lock',
  'http-auth-interceptor',
  require('angular-jwt')
]


let userModule = angular.module('user', modDeps)

.config(['lockProvider', 'jwtOptionsProvider', '$httpProvider', function(lockProvider, jwtOptionsProvider, $httpProvider ) {
              lockProvider.init({
                  clientID: 'OZBDFi8UeN9fA1Wa8h2BSMYO0zT25R9m',
                  domain: 'neteoc.auth0.com'
              });
              jwtOptionsProvider.config({
                tokenGetter: function () {
                    return localStorage.getItem('id_token');
                },
                whiteListedDomains: ['localhost'],
                unauthenticatedRedirectPath: '/login'
            });
            // Add the jwtInterceptor to the array of HTTP interceptors
            // so that JWTs are attached as Authorization headers
            $httpProvider.interceptors.push('jwtInterceptor');
}])

.run(['Auth', '$rootScope', 'lock', function(Auth, $rootScope, lock) {

      // Put the authService on $rootScope so its methods
      // can be accessed from the nav bar
      $rootScope.authService = Auth;

      // Register the authentication listener that is
      // set up in auth.service.js
      Auth.registerAuthenticationListener();

      // Register the synchronous hash parser
      // when using UI Route
      lock.interceptHash();

}])

.service('Auth', AuthService)



.name;

export default userModule;
