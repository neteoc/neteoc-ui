'use strict';


module.exports = function(parentModule) {

    require('angular-datatables/dist/plugins/columnfilter/angular-datatables.columnfilter.js');
    require('angular-datatables/dist/plugins/bootstrap/angular-datatables.bootstrap.js');

    require('datatables.net-select');
    require('angular-datatables/dist/plugins/select/angular-datatables.select.min.js');

    var moment = require('moment');


    parentModule.approveUserController = parentModule._module.controller(parentModule.pluginName + '.approveUserController', ['UserApprove', 'User', function(UserApprove, User) {
        let vm = this;
        let title = "Approve Users";

        let getUsers = function() {
            UserApprove.query()
                .$promise
                .then(function(users){
                    console.log(users);
                    angular.extend(vm, {
                        users: users
                    });
                    $(document).ready(function() {
                        $('#approvelisttable').DataTable();
                    } );
                });
        };

        $(document).ready(function() {
            getUsers();
        } );

        let approveuser = function(userID){

            User.get({ id: userID}).$promise.then(function(user){
                user.status = "approved";
                user.$update(function(){
                    getUsers();
                });
                //getUsers
                //save userstatus then refresh list
            });

        };


        angular.extend(vm, {
            title: title,
            approveuser: approveuser
        });


    }]);

    parentModule.adminIndexController = parentModule._module.controller(parentModule.pluginName + '.adminIndexController', ['User', function(User) {
      let vm = this;
      let title = "Site Administration";




      angular.extend(vm, {
          title: title
      });


    }]);

};
