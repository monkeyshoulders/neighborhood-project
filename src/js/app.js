
//    TODO:  1. InfoWindow
//           2. Clicking list view displays infoWindow on marker
//           3. Markers Bounce when Clicked
//           4. Use Instagram API
//           5. Error handling message
//           6. README
//           7. Mobile and Tablet Version


var Brewery = function(data) {
  var self = this;
  this.name = data.name;
  this.hood = data.hood + "  | ";
  this.style = 'Style: ' + data.style;
  this.website = data.website;
  this.icon = data.icon;
  this.marker = new google.maps.Marker({
    position: data.ll,
    map: map,
    icon: data.mapicon,
    animation: google.maps.Animation.DROP,

  });

  this.marker.addListener('click', function() {        ///////////This doesn't work
    infowindow.open(map, marker);
  });

  this.infoWindow = new google.maps.InfoWindow({     ///////// nor does this
    content: "brewInfoString",
  });

  this.brewInfoString = '<div id="brewInfoWindow"><div id="brew-name"><em>' + self.name + "</em></div>" + '<div>' + self.address + "</div>" + '<div>' + self.hood + "</div>" + '<div>' + self.website + "</div></div>";
                                                      ///////////  this either

};


var ViewModel = function() {
  var self = this;

  this.breweries = ko.observableArray();
  this.filterInput = ko.observable('');
  for (var i = 0; i < brewers.length; i++) {
    this.breweries.push(new Brewery(brewers[i]));
  }

  self.filterBrew = ko.computed(function() {
    var filter = self.filterInput().toLowerCase();
    return ko.utils.arrayFilter(self.breweries(), function(brewery) {
      var match = brewery.name.toLowerCase().indexOf(filter) !== -1 || brewery.hood.toLowerCase().indexOf(filter) !== -1 || brewery.style.toLowerCase().indexOf(filter) !== -1; // store the match state *help from Susan in 1:1
      brewery.marker.setVisible(match);
      return match;
    });
  });

  self.showWindow = function(location) {  //???????????? do i need this here
    google.maps.event.addListener(marker, 'click', function() {
      infowindow.open(map, marker);
    });
  };



};

var map;
var markers = [];

function initMap() {
  map = new google.maps.Map(document.getElementById('map'), {
    center: {
      lat: 35.218939,
      lng: -80.842209
    },
    zoom: 13,
    mapTypeControl: false,
    styles: [{
      stylers: [{
        saturation: -100
      }]
    }]
  });

  ko.applyBindings(new ViewModel());
}

// http://knockoutjs.com/documentation/click-binding.html#note-1-passing-a-current-item-as-a-parameter-to-your-handler-function
// Filtering an array: http://www.knockmeout.net/2011/04/utility-functions-in-knockoutjs.html
// http://knockoutjs.com/documentation/computedObservables.html
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/indexOf
