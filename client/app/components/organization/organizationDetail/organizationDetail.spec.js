import OrganizationDetailModule from './organizationDetail'
import OrganizationDetailController from './organizationDetail.controller';
import OrganizationDetailComponent from './organizationDetail.component';
import OrganizationDetailTemplate from './organizationDetail.html';

describe('OrganizationDetail', () => {
  let $rootScope, makeController;


  beforeEach(window.module(OrganizationDetailModule));
  beforeEach(inject((_$rootScope_) => {
    $rootScope = _$rootScope_;
    makeController = () => {
      return new OrganizationDetailController();
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
      expect(OrganizationDetailTemplate).to.match(/\s?\<navbar><\/navbar>\s?/g);
    });
  });

  describe('Component', () => {
      // component/directive specs
      let component = OrganizationDetailComponent;

      it('includes the intended template',() => {
        expect(component.template).to.equal(OrganizationDetailTemplate);
      });

      it('invokes the right controller', () => {
        expect(component.controller).to.equal(OrganizationDetailController);
      });
  });
});
