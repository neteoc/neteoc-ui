class GisController {
  constructor($http, $scope, $exif) {
    this.name = 'gis';
    this.$http = $http;
    this.$scope = $scope;
    this.$exif = $exif;

    // TODO: This ain't right. Auth service or something, right?
    var authToken = localStorage.getItem('id_token');
    $http.defaults.headers.common.Authorization = 'bearer ' + authToken;
    this.userId = localStorage.getItem('neteoc_id');

    this.hasLatLongFromImage = false;
    this.currentPosition = "";
    this.resetNewPin();

    this.getLocation();

    this.getPins();

    this.pinGrid = {
      data: '$ctrl.pins',
      columnDefs: [{
        name: 'Location',
        cellTemplate: '<div>{{row.entity.position.latitude}}, {{row.entity.position.longitude}}</div>'
      }, {
        name: 'Created',
        field: 'createTime'
      }, {
        name: 'Uploaded',
        cellTemplate: '<div>{{row.entity.uploaded}}</div>'
      }, {
        name: ' ',
        cellTemplate: '<div><button ng-click="grid.appScope.organizationDetails(row.entity.id)">Edit</button></div>'
      }]
    };

    $scope.attachmentAdded = this.attachmentAdded;
  }
  // TODO: Cell template for uploaded should be icons based on state, with title for explanation

  resetNewPin = () => {

      // TODO: each pin needs to be composed of events ...
      // Each event is like a state-in-time with a userId and timestamp attached to it ...
    this.newPin = {
        "id": this.generateUUID(),
        "author": this.userId,
        "uploaded" : "false",
        "fields" : {
            "1" : "change me "
        },
        "attachments" : {},
        "hasAttachments" : function() {
            return Object.keys(this.attachments).length > 0;
        }
    }
  }
  
    getLocation = () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(this.positionCallback);
        }
    }

    positionCallback = (position) => {
        this.newPin.position = this.currentPosition = {
            "accuracy" : position.coords.accuracy,
            "altitude" : position.coords.altitude,
            "altitudeAccuracy" : position.coords.altitudeAccuracy,
            "heading" : position.coords.heading,
            "latitude" : position.coords.latitude,
            "longitude" : position.coords.longitude,
            "speed" : position.coords.speed
        }
    }

    getPins = () => {

        this.pins = JSON.parse(localStorage.getItem("unsentPins")) || [];

        let vm = this;
        // this.$http.get('http://54.172.225.43:55142/users/' + this.userId + "/flaregroups").then(function(response) {
        this.$http.get('https://mockapi.neteoc.com/pins/').then(function(response) {

            var remotePins = response.data;

            if(vm.pins) {
                vm.pins = vm.pins.concat(remotePins);
            } else {
                vm.pins = remotePins;
            }

        });
    }

    addNewPinField = () => {

        this.newPin.fields[Object.keys(this.newPin.fields).length + 1] = "change me";
    }
  
    createMapEntry = () => {

        this.newPin.createTime = this.getCurrentUnixTime();

        this.pins.push(this.newPin);
        this.uploadPin(this.newPin);

        this.hasLatLongFromImage = false;
        this.resetNewPin();
    }

    uploadPin = (pin) => {

        let vm = this;
        this.$http.post('http://54.172.225.43:55142/pins', pin).then(function successCallback(response) {

            console.log("Oh. We actually got a response. That's not supposed to happen.");
            console.log(response.data);

            pin.uploaded = "success";

        }, function errorCallback(response) {

            console.log("An error happened. We expected that (for now).");
            if(response.status != 404 && response.status != -1) {
                console.log(response);
            }

            pin.uploaded = "error";

            var unsentPins = JSON.parse(localStorage.getItem("unsentPins"));

            if(unsentPins == null) {
                unsentPins = [];
            }

            unsentPins.push(pin);

            localStorage.setItem("unsentPins", JSON.stringify(unsentPins));
        });
    }

    attachmentAdded = (event) => {

        let vm = this;
        
        var files = event.target.files;

        if(files.length == 0) {
            return;
        }

        var reader = new FileReader();
        var fileName = files[0].name;

        reader.onload = function(frEvent) {

            console.log(frEvent);
            // console.log(frEvent.target.result);
            document.getElementById("imagePreview").innerHTML = '<img width="100px" height="100px" src="'+frEvent.target.result+'" />';
            // document.getElementById("imagePreview").style.backgroundImage = 'url("'+frEvent.target.result+'")';

            vm.newPin.attachments[fileName] = frEvent.target.result;
        }
        reader.readAsDataURL(files[0]);
        
        // if has geo data, allow to set lat long from image

        // TODO: Convert to promise or something
        this.$exif.getData(files[0], function() {

            // console.log(vm.$exif.getAllTags(this));
            let geoData = vm.$exif.getGeoData(this);

            if(geoData[0] == 0) {
                return;
            }

            vm.hasLatLongFromImage = true;
            vm.imageLatLong = {

                "name" :  this.name,
                "latitude" : geoData[0],
                "longitude" : geoData[1],
                "set" : function () {
                    vm.newPin.position.latitude = vm.imageLatLong.latitude;
                    vm.newPin.position.longitude = vm.imageLatLong.longitude;
                }
            }

            vm.$scope.$digest();
        });
    }

    clearAttachments = () => {

        this.newPin.attachments = {};
    }

    getCurrentUnixTime = () => {

        return (new Date()).getTime()/1000|0;
    }
    
    generateUUID = () => {
        var d = new Date().getTime();
        if(window.performance && typeof window.performance.now === "function"){
            d += performance.now(); //use high-precision timer if available
        }
        var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
            var r = (d + Math.random()*16)%16 | 0;
            d = Math.floor(d/16);
            return (c=='x' ? r : (r&0x3|0x8)).toString(16);
        });
        return uuid;
    }

    /* Debug */
    
    logPins = () => {

        console.log(this.pins);
    }
}

GisController.$inject = ['$http', '$scope', 'exif'];
export default GisController;
