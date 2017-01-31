import angular from 'angular';
import uiRouter from 'angular-ui-router';
import mapComponent from './map.component';

let mapModule = angular.module('map', [
  uiRouter
])

.component('map', mapComponent)

.name;

export default mapModule;
