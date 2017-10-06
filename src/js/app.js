//    TODO:  3. Markers Bounce when Clicked
//           4. Use Instagram API
//           5. Error handling message
//           6. README
//           7. Mobile and Tablet Version


var Brewery = function(data) { // Brewery contructor that accesses brewers in model.js
  var self = this;
  this.name = data.name;
  this.address = data.address;
  this.hood = data.hood + " " + " ";
  this.style = 'Style: ' + data.style;
  this.website = '<a href="' + data.website + '" target="blank">Go to Website</a>';
  this.icon = data.icon;
  this.marker = new google.maps.Marker({ // creates a new marker
    position: data.ll,
    map: map,
    icon: data.mapicon,
    animation: google.maps.Animation.DROP,

  });

  this.marker.addListener('click', toggleBounce, function() { //opens infoWindow
    infowindow.setContent(self.brewInfoString);
    infowindow.open(map, this);
    console.log('click');
 });

 // this.marker.addListener('mouseover', function(){
 //   this.marker.mouseover = true;
 //   this.marker.setAnimation(google.maps.Animation.BOUNCE)
 //  console.log('mouseover');
 // });

  this.brewInfoString = makeInfoString(self); //accesses the string content function


};

  function toggleBounce(marker) {
    var marker = this;
      this.setAnimation(google.maps.Animation.BOUNCE);
      this.setTimeout(function() {
        this.setAnimation(null);
      })(500);
    };


function makeInfoString(data) { //creates infoWindow content
  var content = '<div id="brewInfoWindow"><div id="brew-name"><em>' + data.name +
    '</em></div>' + '<div>' + data.address +
    '</div>' + '<div>' + data.hood +
    '</div>' + '<div>' + data.website +
    '</div></div>';
  return content;
};


var ViewModel = function() {
  var self = this;

  this.breweries = ko.observableArray(); // watches breweries array
  this.filterInput = ko.observable(''); // watches search bar for Filtering
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

  self.showWindow = function() { //displays infoWindow when list item is Clicked

    infowindow.setContent(this.brewInfoString);
    infowindow.open(map, this.marker);

  };
};

var map; // delclares global map var
var infowindow; //declares global infowindow var
var markers = []; // stores markers

function initMap() { // initializes map
  infowindow = new google.maps.InfoWindow();
  map = new google.maps.Map(document.getElementById('map'), {
    center: {
      lat: 35.218939,
      lng: -80.842209
    },
    zoom: 13,
    mapTypeControl: false, // excludes option to switch map types
    styles: [{
      stylers: [{
        saturation: -100 // makes map grey
      }]
    }]
  });

  ko.applyBindings(new ViewModel());
}
