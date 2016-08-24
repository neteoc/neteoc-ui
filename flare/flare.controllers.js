'use strict';


module.exports = function(parentModule) {



    parentModule._module.controller('Flare.ListPageController', ['$scope', '$http', function($scope, $http) {
        let vm = this;
        let title = "Lists";

        console.log('hello');

        angular.extend(this, {
            title: title
        });
    }]);

};
