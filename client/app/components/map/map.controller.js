class MapController {
  constructor($http) {
    this.name = 'map';
    this.$http = $http;

    // TODO: This ain't right. Auth service or something, right?
    var authToken = localStorage.getItem('id_token');
    $http.defaults.headers.common.Authorization = 'bearer ' + authToken;
    this.userId = localStorage.getItem('neteoc_id');

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
      }]
    };
  }
  // TODO: Cell template for uploaded should be icons based on state, with title for explanation

  resetNewPin = () => {

      // TODO: each pin needs to be composed of events ...
      // Each event is like a state-in-time with a userId and timestamp attached to it ...
    this.newPin = {
        "uploaded" : "false",
        "fields" : {
            "1" : "change me "
        }
    }
  }
  
    getLocation = () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(this.positionCallback);
        }
    }

    positionCallback = (position) => {
        this.currentPosition = {
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

        this.newPin.position = this.currentPosition;
        this.newPin.createTime = this.getCurrentUnixTime();
        this.newPin.id = this.generateUUID();
        this.newPin.author = this.userId;

        this.pins.push(this.newPin);
        this.uploadPin(this.newPin);

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

MapController.$inject = ['$http'];
export default MapController;
