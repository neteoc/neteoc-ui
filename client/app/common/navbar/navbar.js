import angular from 'angular';
import uiRouter from 'angular-ui-router';
import navbarComponent from './navbar.component';
import MenuFactory from './menu.factory';
import User from '../user/user';

let navbarModule = angular.module('navbar', [
  uiRouter,
  User
])

.factory('Menu', MenuFactory)

.component('navbar', navbarComponent)

.name;

export default navbarModule;
