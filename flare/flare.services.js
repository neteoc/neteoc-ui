'use strict';


module.exports = function(parentModule) {

    parentModule._module
        .factory('List', function ($resource) {
            return $resource('/lists/:id', { id: '@_id' },
                {
                    'update': {
                        method:'PUT'
                    }
                });
        });


    parentModule._module
        .factory('Message', function ($resource) {
            return $resource('/message/:id');
        })
        .factory('Message_inbox', function ($resource) {
            return $resource('/message/received');
        })
};
