'use strict';


module.exports = function(parentModule) {

    require('angular-datatables/dist/plugins/columnfilter/angular-datatables.columnfilter.js');
    require('angular-datatables/dist/plugins/bootstrap/angular-datatables.bootstrap.js');

    require('datatables.net-select');
    require('angular-datatables/dist/plugins/select/angular-datatables.select.min.js');

    parentModule.ListPageController = parentModule._module.controller('Flare.ListPageController', ['List', function(List) {
        let vm = this;
        let title = "Lists";


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


        angular.extend(vm, {
            title: title
        });


    }]);


    parentModule.ListDetailPageController = parentModule._module.controller('Flare.ListDetailPageController', [ '$routeParams', 'List', function($routeParams, List) {
        let vm = this;

        List.get({ id: $routeParams.id})
            .$promise
            .then(function(list){
                angular.extend(vm, {
                    list: list
                });
                $(document).ready(function() {
                    $('#listdetailtable').DataTable();
                } );
            });

        angular.extend(vm, {
            title: $routeParams.id
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
        let Flares = {};
        let message = "";
        let FormTitle = "Send Flare";
        let newmsg = new Message();

        let getFlares = function (){
            Message.query()
                .$promise
                .then(function(messages){
                    console.log(messages);
                    angular.extend(vm, {
                        messages: messages
                    });
                    $(document).ready(function() {
                        $('#messagestable').DataTable();
                    } );
                });



        };

        let savemessage = function(){
            console.log(newmsg);
            Message.save(newmsg, function(){
                console.log('message saved!')
                getFlares();
            })
        };

        let getLists = function(){
            List.query()
            .$promise
            .then(function(lists){
                console.log(lists);
                angular.extend(vm, {
                    lists: lists
                });
            });
        };

        $(document).ready(function() {
            getFlares();
        } );



        let title = "Flares";
        angular.extend(vm, {
            title: title,
            message: message,
            getFlares: getFlares,
            getLists: getLists,
            newmsg: newmsg,
            FormTitle: FormTitle,
            savemessage: savemessage
        });
    }]);


    parentModule.MsgDetailPageController = parentModule._module.controller('Flare.MsgDetailPageController', [ '$routeParams', 'List', 'Message', function($routeParams, List, Message) {
        let vm = this;



        Message.get({ id: $routeParams.id})
            .$promise
            .then(function(message){
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
