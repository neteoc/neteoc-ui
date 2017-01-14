import angular from 'angular';
import uiRouter from 'angular-ui-router';
import flareComponent from './flare.component';

let flareModule = angular.module('flare', [
  uiRouter
])

.component('flare', flareComponent)

.name;

export default flareModule;
