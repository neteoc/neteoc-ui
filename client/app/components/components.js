import angular from 'angular';
import Home from './home/home';
import About from './about/about';
import Profile from './profile/profile';

let componentModule = angular.module('app.components', [
  Home,
  About,
  Profile
])

.name;

export default componentModule;
