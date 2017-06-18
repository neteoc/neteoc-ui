import angular from 'angular';
import ExifService from './exif.service';


let exifModule = angular.module('exif', [])

.service('exif', ExifService)

.name;

export default exifModule;
