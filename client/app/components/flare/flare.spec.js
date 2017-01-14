import FlareModule from './flare'
import FlareController from './flare.controller';
import FlareComponent from './flare.component';
import FlareTemplate from './flare.html';

describe('Flare', () => {
  let $rootScope, makeController;

  beforeEach(window.module(FlareModule));
  beforeEach(inject((_$rootScope_) => {
    $rootScope = _$rootScope_;
    makeController = () => {
      return new FlareController();
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
      expect(FlareTemplate).to.match(/{{\s?\$ctrl\.name\s?}}/g);
    });
  });

  describe('Component', () => {
      // component/directive specs
      let component = FlareComponent;

      it('includes the intended template',() => {
        expect(component.template).to.equal(FlareTemplate);
      });

      it('invokes the right controller', () => {
        expect(component.controller).to.equal(FlareController);
      });
  });
});
