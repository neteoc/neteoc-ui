'use strict';


module.exports = function(parentModule) {



    require('angular-datatables/dist/plugins/columnfilter/angular-datatables.columnfilter.js');
    require('angular-datatables/dist/plugins/bootstrap/angular-datatables.bootstrap.js');

    require('datatables.net-select');
    require('angular-datatables/dist/plugins/select/angular-datatables.select.min.js');

    var moment = require('moment');


    parentModule.IndexController = parentModule._module.controller(parentModule.pluginName + '.IndexController', ['Org', function(Org) {
        let vm = this;
        let title = "Organization Admin";
        let neworg = new Org;
        $(document).ready(function() {
            getOrgs();
        } );


        let getOrgs = function() {
          Org.query().$promise.then(function(orgs){
            console.log(orgs);
            angular.extend(vm, {
              orgs: orgs
            })
            $(document).ready(function() {
               $('#orglisttable').DataTable();
            } );

          });

        };



        let createOrg = function() {
          Org.save(neworg).$promise.then(function(neworg){
            getOrgs();
          })


        };


        angular.extend(vm, {
            title: title,
            neworg: neworg,
            createOrg: createOrg
        });


    }]);

    parentModule.OrgDetailController = parentModule._module.controller(parentModule.pluginName + '.OrgDetailController', ['Org', 'Invite', '$routeParams', function(Org, Invite, $routeParams) {
      let vm = this;
      let title = "Organization Admin";
      let newinvite = new Invite;

      let getOrg = function() {

          return Org.get({ id: $routeParams.orgid})
              .$promise
              .then(function(org){
                  console.log(org);
                  angular.extend(vm, {
                      org: org
                  });
                  newinvite.orgid = org._id;
                  $(document).ready(function() {
                      $('#orgdetailtable').DataTable();
                  } );
                  return org;
              });

      };

      let getInvites = function() {
        Invite.query({ orgid: $routeParams.orgid })
          .$promise.then(function(invites){
              angular.extend(vm, {
                invites: invites
              })
              $(document).ready(function(){
                $('#orginvitetable').DataTable();
              })
          })
      };

      let inviteUser = function() {
        //email: req.body.email,
        //org: req.body.org

            Invite.save(newinvite).$promise.then(function(err, invite){
                    if (err){
                        console.log(err);
                    }
                    getInvites();
            })

      }

      let org = getOrg();

      getInvites();


      let archiveInvite = function(inviteID) {
        Invite.get({orgid: $routeParams.orgid, inviteid: inviteID})
        .$promise.then(function(invite){
            invite.isArchived = true;
            invite.orgid = $routeParams.orgid;
            invite.inviteid = inviteID;
            invite.$delete(function(data){
              console.log(data);
              getInvites();
            });

        });
      };


      let makeAdmin = function(userID){
          vm.org.admins.push(userID);
          vm.org.$update(function(){
              getOrg();
          })
      };

      let isAdmin = function(userID){
          if (vm.org.admins.indexOf(userID) != -1 ){
              return true;
          } else {
              return false;
          }
      };

      let removeUser = function(userID){
          for(var i =  vm.org.admins.length - 1; i >= 0; i--) {
              if( vm.org.admins[i] === userID) {
                  vm.org.admins.splice(i, 1);
                  vm.org.$update(function(){
                      getOrg();
                  })
              }
          }
      };



      angular.extend(vm, {
        title: title,
        isAdmin: isAdmin,
        makeAdmin: makeAdmin,
        removeUser: removeUser,
        newinvite: newinvite,
        inviteUser: inviteUser,
        archiveInvite: archiveInvite
      })

    }]);

    parentModule.InviteDetailController = parentModule._module.controller(parentModule.pluginName + '.InviteDetailController', ['Org', 'Invite', '$routeParams', '$location', function(Org, Invite, $routeParams, $location) {
      var vm = this;
      var title = "Invite Details";
      let disableInvite = true;


      let getInvite = function() {

        Invite.get({ orgid: $routeParams.orgid, inviteid: $routeParams.inviteid })
          .$promise.then(function(invite){
              angular.extend(vm, {
                invite: invite
              });
              enableInvite();
          })
      };



      let enableInvite = function() {
        //inviteExpired(vm.invite.createdAt, 1);
        var diff = moment(vm.invite.createdAt).diff(moment(), 'days')
        console.log(diff)
          if (vm.invite.status == 'pending' && diff <= 3){
            vm.disableInvite = false;
          }

      };


      getInvite();

      let updateInvite = function(status) {
         if (!vm.disableInvite) {
           vm.invite.status = status;
           vm.invite.orgid = $routeParams.orgid;
           vm.invite.inviteid = $routeParams.inviteid;

           vm.invite.$update(function(invite){

             if (invite.message == "saved"){
               $location.url('/ui/user/profile');
             }
           })

         } else {
           console.log("status is disabled");
         }

      }




      angular.extend(vm, {
        title: title,
        updateInvite: updateInvite,
        disableInvite: disableInvite
      })
    }])

};
