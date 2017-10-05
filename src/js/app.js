//    TODO:  3. Markers Bounce when Clicked
//           4. Use Instagram API
//           5. Error handling message
//           6. README
//           7. Mobile and Tablet Version


var Brewery = function(data) { // Brewery contructor that accesses brewers in model.js
  var self = this;
  this.name = data.name;
  this.address = data.address;
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

  this.marker.addListener('click', function() { //opens infoWindow
    infowindow.setContent(self.brewInfoString);  
    infowindow.open(map, this);

  });

  this.brewInfoString = makeInfoString(self); //access the string constructor

};

  function makeInfoString(data) {  //creates infoWindow content
    var content = '<div id="brewInfoWindow"><div id="brew-name"><em>' + data.name +
      '</em></div>' + '<div>' + data.address +
      '</div>' + '<div>' + data.hood +
      '</div>' + '<div>' + data.website +
      '</div></div>';
    return content;
  }


var ViewModel = function() {
  var self = this;

  this.breweries = ko.observableArray();  // watches breweries array
  this.filterInput = ko.observable('');  // watches search bar for Filtering
  for (var i = 0; i < brewers.length; i++) {
    this.breweries.push(new Brewery(brewers[i]));
  }

  self.filterBrew = ko.computed(function() { // filters list view of breweries
    var filter = self.filterInput().toLowerCase();
    return ko.utils.arrayFilter(self.breweries(), function(brewery) {
      var match = brewery.name.toLowerCase().indexOf(filter) !== -1 || brewery.hood.toLowerCase().indexOf(filter) !== -1 || brewery.style.toLowerCase().indexOf(filter) !== -1; // store the match state *help from Sarah in 1:1
      brewery.marker.setVisible(match);
      return match;
    });
  });

  self.showWindow = function() {  //displays infoWindow when list item is Clicked

    infowindow.open(map, this.marker);
    infowindow.setContent(this.brewInfoString);

  };
};

var map;
var markers = [];  // stores markers
var infowindow;

function initMap() {  // initializes map
  infowindow = new google.maps.InfoWindow();
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
