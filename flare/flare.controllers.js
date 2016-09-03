'use strict';


module.exports = function(parentModule) {

    require('angular-datatables/dist/plugins/columnfilter/angular-datatables.columnfilter.js');
    require('angular-datatables/dist/plugins/bootstrap/angular-datatables.bootstrap.js');

    require('datatables.net-select');
    require('angular-datatables/dist/plugins/select/angular-datatables.select.min.js');

    var moment = require('moment');

    parentModule.ListPageController = parentModule._module.controller('Flare.ListPageController', ['List', function(List) {
        let vm = this;
        let title = "Lists";
        let newList = new List;

        let getLists = function() {
            List.query()
                .$promise
                .then(function(lists){
                    console.log(lists);
                    angular.extend(vm, {
                        lists: lists
                    });
                    $(document).ready(function() {
                        $('#listtable').DataTable();
                    } );
                });
        };



        let createList = function() {


            List.save(newList, function(){
                    console.log('list saved!');
                    getLists();
                })


        };

        getLists();

        angular.extend(vm, {
            title: title,
            createList: createList,
            newList: newList,
            getLists: getLists
        });


    }]);


    parentModule.ListDetailPageController = parentModule._module.controller('Flare.ListDetailPageController', [ '$routeParams', 'List', 'User', function($routeParams, List, User) {
        let vm = this;
        let adduserdata = "";

        User.query().$promise.then(function(users){
                angular.extend(vm, {
                    users: users
                })
            });

        let getList = function() {

            return List.get({ id: $routeParams.id})
                .$promise
                .then(function(list){
                    console.log(list);
                    angular.extend(vm, {
                        list: list
                    });
                    $(document).ready(function() {
                        $('#listdetailtable').DataTable();
                    } );
                    return list;
                });

        };

        let addUser = function(){

            getList()
                .then(function(list){
                    //console.log(list);
                    //console.log(adduserdata);
                    //console.log(vm.adduserdata);
                    if (typeof list.members === "undefined") {
                        list.members = [];
                    }
                    list.members.push(vm.adduserdata);
                    list.$update(function(){
                        getList();
                    });
                });


        };

        let makeAdmin = function(userID){


            vm.list.admins.push(userID);
            vm.list.$update(function(){
                getList();
            })




        };

        let isAdmin = function(userID){

            console.log(userID);
            console.log(vm.list.admins);

            if (vm.list.admins.indexOf(userID) != -1 ){
                return true;
            } else {
                return false;
            }



        };

        let removeUser = function(userID){


            for(var i =  vm.list.admins.length - 1; i >= 0; i--) {
                if( vm.list.admins[i] === userID) {
                    vm.list.admins.splice(i, 1);
                    vm.list.$update(function(){
                        getList();
                    })
                }
            }



        };

        getList();

        angular.extend(vm, {
            title: $routeParams.id,
            adduserdata: adduserdata,
            addUser: addUser,
            isAdmin: isAdmin,
            makeAdmin: makeAdmin,
            removeUser: removeUser
        });


    }]);


    parentModule.CreateController = parentModule._module.controller('Flare.CreateController', ['List', 'Message', function(List, Message) {
        let vm = this;
        let FormTitle = "Send Flare";
        let message = "";
        let newmsg = new Message();

        List.query()
            .$promise
            .then(function(lists){
                console.log(lists);
                angular.extend(vm, {
                    lists: lists
                });
            });

        let savemessage = function(){
            Message.save(newmsg, function(){
                console.log('message saved!')
            })
        };

        angular.extend(vm, {
            FormTitle: FormTitle,
            newmsg: newmsg,
            savemessage: savemessage
        });

    }]);


    parentModule.FlarePageController = parentModule._module.controller('Flare.FlarePageController', ['List', 'Message', function(List, Message) {
        let vm = this;
        let title = "Flares sent by you";
        let Flares = {};
        let message = "";
        let FormTitle = "Send Flare";
        let formPatterns = {
            word: /^\s*\w*\s*$/
        };
        let newmsg = new Message();

        let getFlares = function (){
            Message.query()
                .$promise
                .then(function(messages){
                    angular.extend(vm, {
                        messages: messages
                    });
                    $(document).ready(function() {
                        $('#messagestable').DataTable();
                    } );
                    angular.forEach(messages, function(value, key) {
                        messages[key].createdAtString = moment(value.createdAt).format("DD MMM YYYY - kkMM");
                    });
                });



        };

        let savemessage = function(){
            Message.save(newmsg, function(){
                getFlares();
            })
        };

        let getLists = function(){
            List.query()
            .$promise
            .then(function(lists){
                angular.extend(vm, {
                    lists: lists
                });
            });
        };

        $(document).ready(function() {
            getFlares();
        } );




        angular.extend(vm, {
            title: title,
            message: message,
            getFlares: getFlares,
            getLists: getLists,
            newmsg: newmsg,
            FormTitle: FormTitle,
            savemessage: savemessage,
            formPatterns: formPatterns
        });
    }]);


    parentModule.MsgDetailPageController = parentModule._module.controller('Flare.MsgDetailPageController', [ '$routeParams', 'List', 'Message', function($routeParams, List, Message) {
        let vm = this;



        Message.get({ id: $routeParams.id})
            .$promise
            .then(function(message){

                message.createdAtString = moment(message.createdAt).format("DD MMM YYYY - kkMM");

                angular.extend(vm, {
                    message: message
                });

                List.get({ id: message.list._id})
                    .$promise
                    .then(function(list){
                        angular.extend(vm, {
                            list: list
                        });
                        $(document).ready(function() {
                            $('#msgdetailtable').DataTable();
                        } );
                    });
            });

        angular.extend(vm, {
            title: $routeParams.id
        });


    }]);



};
