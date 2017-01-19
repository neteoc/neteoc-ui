import angular from 'angular';
import Home from './home/home';
import About from './about/about';
import Profile from './profile/profile';
import Organization from './organization/organization';
import Flare from './flare/flare';
import Missions from './missions/missions';


let componentModule = angular.module('app.components', [
  Home,
  About,
  Profile,
  Organization,
  Flare,
  Missions
])

.name;

export default componentModule;
