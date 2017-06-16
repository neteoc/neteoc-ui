import angular from 'angular';
import Navbar from './navbar/navbar';
import Footernav from './footernav/footernav'
import Hero from './hero/hero';
import User from './user/user';
import Exif from './exif/exif';

let commonModule = angular.module('app.common', [
  Navbar,
  Footernav,
  Hero,
  User,
  Exif
])

.name;

export default commonModule;
