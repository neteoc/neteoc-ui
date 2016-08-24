'use strict';


module.exports = function(parentModule) {

    parentModule._module
        .factory('List', function ($resource) {
            return $resource('/lists/:id');
        });


    parentModule._module
        .factory('Message', function ($resource) {
            return $resource('/message/:id');
        });
};
