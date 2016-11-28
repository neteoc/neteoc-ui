'use strict';


module.exports = function(parentModule) {


    parentModule._module
        .factory('UserApprove', function ($resource) {
            return $resource('/api/admin/userapprove/:id', { id: '@_id' },
                {
                    'update': {
                        method:'PUT'
                    }
                });
        });

};
