'use strict';


module.exports = function(parentModule) {

    parentModule._module
        .factory('List', ['$resource', '$appEnvironment', function ($resource, $appEnvironment) {
            return $resource($appEnvironment.config.apiUrl + 'lists/:id', { id: '@_id' },
                {
                    'update': {
                        method:'PUT'
                    }
                });
        }]);


    parentModule._module
        .factory('Message', ['$resource', '$appEnvironment', function ($resource, $appEnvironment) {
            return $resource($appEnvironment.config.apiUrl + 'message/:id');
        }])
        .factory('Message_inbox', ['$resource', '$appEnvironment', function ($resource, $appEnvironment) {
            return $resource($appEnvironment.config.apiUrl + 'message/received');
        }])
};
