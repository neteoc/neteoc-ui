'use strict';


module.exports = function(parentModule) {

  parentModule._module
      .service('authService', authService);

    function authService($q, lock, authManager, User, $rootScope) {

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
                //console.log(userProfile);
                return userProfile
            }
        }

        function getAuthState() {
            //console.log("=============== Getting Auth State ==================");
            let state = authManager.isAuthenticated();
            if (!state) {
                state = false
            }
            //console.log(state);

            return state;
        }


        function login() {
            lock.show();
        }

        function logout() {
            localStorage.removeItem('id_token');
            localStorage.removeItem('profile');
            localStorage.setItem('isAuthenticated', false);
            $rootScope.profile = {};
            $rootScope.isAuthenticated = false;
            authManager.unauthenticate();
        }


        // Set up the logic for when a user authenticates
        // This method is called from app.run.js
        function registerAuthenticationListener() {
            lock.on('authenticated', function (authResult) {
                console.log(authResult);
                localStorage.setItem('id_token', authResult.idToken);
                localStorage.setItem('access_token', authResult.accessToken);
                authManager.authenticate();

                console.log($rootScope.isAuthenticated);
                lock.getProfile(authResult.idToken, function (error, profile) {
                    if (error) {
                        return console.log(error);
                    }

                    localStorage.setItem('profile', JSON.stringify(profile));
                    deferredProfile.resolve(profile);
                    localStorage.setItem('isAuthenticated', true);
                    $rootScope.isAuthenticated = true;
                });


            });
        }

        return {
            login: login,
            logout: logout,
            registerAuthenticationListener: registerAuthenticationListener,
            getProfileDeferred: getProfileDeferred,
            getProfile: getProfile,
            getAuthState: getAuthState
        }
    }



};
