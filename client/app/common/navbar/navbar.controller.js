class NavbarController {
  constructor(Auth, Menu) {
    this.name = 'navbar';
    this.auth = Auth;
    this.menu = Menu;
    console.log(Auth);
  }


}



NavbarController.$inject = ['Auth', 'Menu'];
export default NavbarController;
