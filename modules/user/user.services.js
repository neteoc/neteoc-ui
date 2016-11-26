'use strict';


module.exports = function(parentModule) {

    parentModule
        .factory('User', function ($resource) {
            return $resource('/user/:id', { id: '@_id' },
                {
                    'update': {
                        method:'PUT'
                    }
                });
        });

    parentModule
        .factory('Session', ['$resource', '$appEnvironment', function ($resource, $appEnvironment) {
            console.log($appEnvironment.config.apiUrl);
            return $resource($appEnvironment.config.apiUrl + 'auth/session/');
        }]);

    parentModule
        .factory('Account', function ($resource) {
            return $resource('/auth/account/');
        });

};
