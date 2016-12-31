class ProfileController {
  constructor(Auth) {
    this.user = Auth.getProfile()
    this.name = 'profile';

  }
}

ProfileController.$inject
ProfileController.$inject = ['Auth'];
export default ProfileController;
