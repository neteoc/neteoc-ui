import MissionDetailModule from './missionDetail'
import MissionDetailController from './missionDetail.controller';
import MissionDetailComponent from './missionDetail.component';
import MissionDetailTemplate from './missionDetail.html';

describe('MissionDetail', () => {
  let $rootScope, makeController;

  beforeEach(window.module(MissionDetailModule));
  beforeEach(inject((_$rootScope_) => {
    $rootScope = _$rootScope_;
    makeController = () => {
      return new MissionDetailController();
    };
  }));

  describe('Module', () => {
    // top-level specs: i.e., routes, injection, naming
  });

  describe('Controller', () => {
    // controller specs
    it('has a name property [REMOVE]', () => { // erase if removing this.name from the controller
      let controller = makeController();
      expect(controller).to.have.property('name');
    });
  });

  describe('Template', () => {
    // template specs
    // tip: use regex to ensure correct bindings are used e.g., {{  }}
    it('has name in template [REMOVE]', () => {
      expect(MissionDetailTemplate).to.match(/{{\s?\$ctrl\.name\s?}}/g);
    });
  });

  describe('Component', () => {
      // component/directive specs
      let component = MissionDetailComponent;

      it('includes the intended template',() => {
        expect(component.template).to.equal(MissionDetailTemplate);
      });

      it('invokes the right controller', () => {
        expect(component.controller).to.equal(MissionDetailController);
      });
  });
});
