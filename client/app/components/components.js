import angular from 'angular';
import Home from './home/home';
import About from './about/about';
import Profile from './profile/profile';
import Organization from './organization/organization';

let componentModule = angular.module('app.components', [
  Home,
  About,
  Profile,
  Organization
])

.name;

export default componentModule;
