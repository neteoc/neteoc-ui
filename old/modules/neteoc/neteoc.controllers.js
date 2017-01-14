'use strict';

module.exports = function(parentModule) {

    parentModule.HomePageController = parentModule._module.controller(parentModule.pluginName + '.HomePageController', ['$scope', '$http', '$location', 'authService', function($scope, $http, $location, authService) {
        let vm = this;
        let title = "Home";

        if(authService.getAuthState()){
            if($location.path() == "/"){
                console.log("default path!");

                console.log($location.path());
                $location.search('main-tab=User&sub-tab=User-profile')
                $location.path('/ui/user/profile')
            }
        }





        angular.extend(this, {
            title: title
        });
    }]);
};
