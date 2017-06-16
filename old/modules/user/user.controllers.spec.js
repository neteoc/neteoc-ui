describe('Login Page Controller', function() {

    var $rootScope;
    var makeController;

    beforeEach(window.module('User'));

    beforeEach(inject((_$rootScope_) => {
        $rootScope = _$rootScope_;
        makeController = () => {
            return new UserLoginPageController();
        };
    }));


    /**
    beforeEach(inject(function(_$rootScope_) {
        console.log("Injecting stuff.");
        $rootScope = _$rootScope_;
    }));
     **/

    it('should math', function() {
        //console.log(User);
        expect(4).toEqual(4)
    })
});