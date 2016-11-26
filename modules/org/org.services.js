'use strict';


module.exports = function(parentModule) {

  
  parentModule._module
      .factory('Org', function ($resource) {
          return $resource('/api/org/:id', { id: '@_id' },
              {
                  'update': {
                      method:'PUT'
                  }
              });
      });


    parentModule._module
        .factory('Invite', function ($resource) {
            return $resource('/api/org/:orgid/invite/:inviteid', { orgid: '@orgid', inviteid:'@inviteid' },
                {
                    'update': {
                       method:'PUT'
                    }
                });
        });




};
