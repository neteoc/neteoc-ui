import angular from 'angular';
import uiRouter from 'angular-ui-router';
import footernavComponent from './footernav.component';

let footernavModule = angular.module('footernav', [
  uiRouter
])

.component('footernav', footernavComponent)

.name;

export default footernavModule;
