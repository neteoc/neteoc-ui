'use strict';


module.exports = function(parentModule) {


  parentModule._module
      .factory('Org', ['$resource', '$appEnvironment', function ($resource, $appEnvironment) {
          return $resource($appEnvironment.config.apiUrl + 'org/:id', { id: '@_id' },
              {
                  'update': {
                      method:'PUT'
                  }
              });
      }]);


    parentModule._module
        .factory('Invite', ['$resource', '$appEnvironment', function ($resource, $appEnvironment) {
            return $resource($appEnvironment.config.apiUrl + 'org/:orgid/invite/:inviteid', { orgid: '@orgid', inviteid:'@inviteid' },
                {
                    'update': {
                       method:'PUT'
                    }
                });
        }]);




};
