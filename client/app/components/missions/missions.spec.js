import MissionsModule from './missions'
import MissionsController from './missions.controller';
import MissionsComponent from './missions.component';
import MissionsTemplate from './missions.html';

describe('Missions', () => {
  let $rootScope, makeController;

  beforeEach(window.module(MissionsModule));
  beforeEach(inject((_$rootScope_) => {
    $rootScope = _$rootScope_;
    makeController = () => {
      return new MissionsController();
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
      expect(MissionsTemplate).to.match(/{{\s?\$ctrl\.name\s?}}/g);
    });
  });

  describe('Component', () => {
      // component/directive specs
      let component = MissionsComponent;

      it('includes the intended template',() => {
        expect(component.template).to.equal(MissionsTemplate);
      });

      it('invokes the right controller', () => {
        expect(component.controller).to.equal(MissionsController);
      });
  });
});
