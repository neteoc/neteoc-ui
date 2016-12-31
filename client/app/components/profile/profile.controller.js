class ProfileController {
  constructor(Auth) {
    this.user = Auth.getProfile()
    this.name = 'profile';
    console.log(Auth);
  }
}

ProfileController.$inject
ProfileController.$inject = ['Auth'];
export default ProfileController;
