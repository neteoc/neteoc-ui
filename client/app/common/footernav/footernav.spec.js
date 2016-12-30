import FooternavModule from './footernav'
import FooternavController from './footernav.controller';
import FooternavComponent from './footernav.component';
import FooternavTemplate from './footernav.html';

describe('Footernav', () => {
  let $rootScope, $state, $location, $componentController, $compile, makeController;

  beforeEach(window.module(FooternavModule));
  beforeEach(inject(($injector) => {
    $rootScope = $injector.get('$rootScope');
    $componentController = $injector.get('$componentController');
    $state = $injector.get('$state');
    $location = $injector.get('$location');
    $compile = $injector.get('$compile');
  }));

  describe('Module', () => {
    // top-level specs: i.e., routes, injection, naming
  });

  describe('Controller', () => {
    let controller;
    beforeEach(() => {
      controller = $componentController('footernav', {
        $scope: $rootScope.$new()
      });
    });
    // controller specs
    it('has a name property [REMOVE]', () => { // erase if removing this.name from the controller
      expect(controller).to.have.property('name');
    });
  });

  describe('Template', () => {
    let scope, template;
    // template specs

    beforeEach(() => {
      scope = $rootScope.$new();
      template = $compile('<footernav></footernav>')(scope);
      scope.$apply();
    });
    // tip: use regex to ensure correct bindings are used e.g., {{  }}
    it('has name in template', () => {
      expect(template.find('nav').find('div').find('div').find('a').html()).to.eq('NetEOC<span class="caret"></span>');
    });
  });

  describe('Component', () => {
      // component/directive specs
      let component = FooternavComponent;

      it('includes the intended template',() => {
        expect(component.template).to.equal(FooternavTemplate);
      });

      it('invokes the right controller', () => {
        expect(component.controller).to.equal(FooternavController);
      });
  });
});
