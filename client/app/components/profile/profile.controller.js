class ProfileController {
  constructor(Auth) {
    this.user = Auth.getProfile()
    this.name = 'profile';

  }
}


ProfileController.$inject = ['Auth'];
export default ProfileController;
