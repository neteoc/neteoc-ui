class MissionsController {
  constructor(Mission) {
    this.name = 'missions';
    this.missions = Mission
  }
}

MissionsController.$inject = ['Mission'];
export default MissionsController;
