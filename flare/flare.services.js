'use strict';


module.exports = function(parentModule) {

    parentModule
        .factory('List', function ($resource) {
            return {

                list: function(){
                    return $resource('/lists')
                },

                find: function(){
                    return $resource('/lists/find')
                },

                removeUser: function(){
                    return $resource('/lists/removeuser')
                }

            }
        });
};
