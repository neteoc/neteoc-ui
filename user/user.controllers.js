'use strict';


module.exports = function(parentModule) {



    parentModule.AccountPageController = parentModule._module.controller('User.AccountPageController', ['$scope', '$http', 'Account', function($scope, $http, Account) {
    let vm = this;
    let title = "Users";
    let accountinfo = Account.get(function (accountinfo){
        console.log(accountinfo);
        });
        console.log('hello');
        console.log(Account);


    angular.extend(this, {
        title: title,
        accountinfo: accountinfo
    });
}]);

    parentModule._module.controller('User.ListPageController', ['$scope', '$http', function($scope, $http) {
        let vm = this;
        let title = "Lists";

        console.log('hello');

        angular.extend(this, {
            title: title
        });
    }]);

};
