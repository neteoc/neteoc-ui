'use strict';


let AuthService = function($q, lock, authManager, $rootScope, $location, $http) {
  var userProfile = JSON.parse(localStorage.getItem('profile')) || null;
  var deferredProfile = $q.defer();

  if (userProfile) {
    deferredProfile.resolve(userProfile);
  }
  function getProfileDeferred() {
       return deferredProfile.promise;
   }

   function getProfile() {
       var userProfile = JSON.parse(localStorage.getItem('profile')) || null;
       if (userProfile) {
           $rootScope.profile = userProfile;
           deferredProfile.resolve(userProfile);
           console.log(userProfile);
           return userProfile
       }
   }

   function getAuthState() {
       // console.log("=============== Getting Auth State ==================");
       let state = authManager.isAuthenticated();
       if (!state) {
           state = false
       }
       // console.log(state);

       return state;
   }


   function login() {
       lock.show();
   }

   function logout() {
       localStorage.removeItem('id_token');
       localStorage.removeItem('profile');
       localStorage.removeItem('neteoc_id0');
       localStorage.setItem('isAuthenticated', false);
       $rootScope.profile = {};
       $rootScope.isAuthenticated = false;
       authManager.unauthenticate();
       $location.path('/');
   }


   // Set up the logic for when a user authenticates
   // This method is called from app.run.js
   function registerAuthenticationListener() {
       lock.on('authenticated', function (authResult) {

            $http.defaults.headers.common.Authorization = 'bearer ' + authResult.idToken;

           localStorage.setItem('id_token', authResult.idToken);
           localStorage.setItem('access_token', authResult.accessToken);
           authManager.authenticate();

           // console.log($rootScope.isAuthenticated);
           lock.getProfile(authResult.idToken, function (error, profile) {
               if (error) {
                   return console.log(error);
               }

                var userPost = {
                    "authId": profile.idToken,
                    "email": profile.email
                };

                $http.post('https://dwaomjth0nnz7.cloudfront.net/users', userPost).then(function(response) {
                    
                    localStorage.setItem('neteoc_id', response.data.id);
                    // console.log(response);
                });

               localStorage.setItem('profile', JSON.stringify(profile));
               deferredProfile.resolve(profile);
               localStorage.setItem('isAuthenticated', true);
               $rootScope.isAuthenticated = true;
           });


       });
   }

   function getUser(userId, callback) {

    $http.defaults.headers.common.Authorization = 'bearer ' + localStorage.getItem("id_token");

    $http.get('https://dwaomjth0nnz7.cloudfront.net/users/' + userId).then(function(response) {

        callback(response.data);
    });
   }

   return {
       login: login,
       logout: logout,
       registerAuthenticationListener: registerAuthenticationListener,
       getProfileDeferred: getProfileDeferred,
       getProfile: getProfile,
       getAuthState: getAuthState,
       getUser: getUser
   }
};

AuthService.$inject = ['$q', 'lock', 'authManager', '$rootScope', '$location', '$http'];

export default AuthService;
