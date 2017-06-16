class HomeController {
  constructor(Auth) {
    this.user = Auth.getProfile()
    this.name = 'home';
    this.Auth = Auth;
  }
}

HomeController.$inject = ['Auth'];

export default HomeController;
