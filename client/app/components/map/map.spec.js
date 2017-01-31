import MapModule from './map'
import MapController from './map.controller';
import MapComponent from './map.component';
import MapTemplate from './map.html';

describe('Map', () => {
  let $rootScope, makeController;

  beforeEach(window.module(MapModule));
  beforeEach(inject((_$rootScope_) => {
    $rootScope = _$rootScope_;
    makeController = () => {
      return new MapController();
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
      expect(MapTemplate).to.match(/{{\s?\$ctrl\.name\s?}}/g);
    });
  });

  describe('Component', () => {
      // component/directive specs
      let component = MapComponent;

      it('includes the intended template',() => {
        expect(component.template).to.equal(MapTemplate);
      });

      it('invokes the right controller', () => {
        expect(component.controller).to.equal(MapController);
      });
  });
});
