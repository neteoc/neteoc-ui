import ListsModule from './lists'
import ListsController from './lists.controller';
import ListsComponent from './lists.component';
import ListsTemplate from './lists.html';

describe('Lists', () => {
  let $rootScope, makeController;

  beforeEach(window.module(ListsModule));
  beforeEach(inject((_$rootScope_) => {
    $rootScope = _$rootScope_;
    makeController = () => {
      return new ListsController();
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
      expect(ListsTemplate).to.match(/{{\s?\$ctrl\.name\s?}}/g);
    });
  });

  describe('Component', () => {
      // component/directive specs
      let component = ListsComponent;

      it('includes the intended template',() => {
        expect(component.template).to.equal(ListsTemplate);
      });

      it('invokes the right controller', () => {
        expect(component.controller).to.equal(ListsController);
      });
  });
});
