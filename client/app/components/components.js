import angular from 'angular';
import Home from './home/home';
import About from './about/about';
import Profile from './profile/profile';
import Organization from './organization/organization';
import Flare from './flare/flare';
import gis from './gis/gis';


let componentModule = angular.module('app.components', [
  Home,
  About,
  Profile,
  Organization,
  Flare,
  gis
])

.name;

export default componentModule;
