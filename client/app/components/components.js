import angular from 'angular';
import Home from './home/home';
import About from './about/about';
import Profile from './profile/profile';
import Organization from './organization/organization';
import Flare from './flare/flare';
import map from './map/map'; // "Map" (case sensitive) is a reserved word


let componentModule = angular.module('app.components', [
  Home,
  About,
  Profile,
  Organization,
  Flare,
  map
])

.name;

export default componentModule;
