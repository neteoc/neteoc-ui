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
        name: 'Name',
        field: 'name'
      }, {
        name: 'Created',
        field: 'createTime'
      }, {
        name: ' ',
        cellTemplate: '<div><button ng-click="grid.appScope.organizationDetails(row.entity.id)">Details</button></div>'
      }]
    };
  }

  resetNewPin = () => {

    this.newPin = {
        "uploaded" : "false",
        "fields" : {
            "1" : "change me "
        }
    }
  }
  
    getLocation = () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(this.showPosition);
        }
    }

    showPosition = (position) => {
        this.currentPosition = position.coords;
    }

    getPins = () => {

        // TODO: get from local ..

        let vm = this;
        // this.$http.get('http://54.172.225.43:55142/users/' + this.userId + "/flaregroups").then(function(response) {
        this.$http.get('https://mockapi.neteoc.com/pins/').then(function(response) {

            angular.extend(vm, {
                pins: response.data
            });
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

        // console.log(this.newPin);
        console.log(JSON.stringify(this.newPin));
        this.resetNewPin();
    }

    uploadPin = (pin) => {

        let vm = this;
        this.$http.post('http://54.172.225.43:55142/pins', pin).then(function successCallback(response) {

            console.log("Oh. We actually got a response. That's not supposed to happen.");
            console.log(response.data);

            // set pin uploaded to true

        }, function errorCallback(response) {

            console.log("An error happened. We expected that (for now).");
            console.log(response);

            var unsentPins = localStorage.getItem("unsentPins");

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
}

MapController.$inject = ['$http'];
export default MapController;
