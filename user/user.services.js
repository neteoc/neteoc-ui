'use strict';


module.exports = function(parentModule) {

    parentModule
        .factory('User', function ($resource) {
            return $resource('/user/:id', {},
                {
                    'update': {
                        method:'PUT'
                    }
                });
        });

    parentModule
        .factory('Session', function ($resource) {
            return $resource('/auth/session/');
        });

    parentModule
        .factory('Account', function ($resource) {
            return $resource('/auth/account/');
        });

};
