'use strict';

module.exports = function(parentModule) {

    parentModule._module
        .factory('People', function() {
            var People = {};

            // Users.method = function() {};

            return People;
        });

    parentModule._module
        .factory('User', ['$resource', '$appEnvironment', function ($resource, $appEnvironment) {
            return $resource($appEnvironment.config.apiUrl + 'user/:id', { id: '@_id' },
                {
                    'update': {
                        method:'PUT'
                    }
                });
        }]);

    parentModule._module
        .factory('Session', ['$resource', '$appEnvironment', function ($resource, $appEnvironment) {
            return $resource($appEnvironment.config.apiUrl + 'auth/session/');
        }]);

    parentModule._module
        .factory('Account', ['$resource', '$appEnvironment', function ($resource, $appEnvironment) {
            return $resource($appEnvironment.config.apiUrl + 'auth/account/');
        }]);
};
