import OrganizationModule from './organization'
import OrganizationController from './organization.controller';
import OrganizationComponent from './organization.component';
import OrganizationTemplate from './organization.html';

describe('Organization', () => {
  let $rootScope, makeController;

  beforeEach(window.module(OrganizationModule));
  beforeEach(inject((_$rootScope_) => {
    $rootScope = _$rootScope_;
    makeController = () => {
      return new OrganizationController();
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
      expect(OrganizationTemplate).to.match(/{{\s?\$ctrl\.name\s?}}/g);
    });
  });

  describe('Component', () => {
      // component/directive specs
      let component = OrganizationComponent;

      it('includes the intended template',() => {
        expect(component.template).to.equal(OrganizationTemplate);
      });

      it('invokes the right controller', () => {
        expect(component.controller).to.equal(OrganizationController);
      });
  });
});
