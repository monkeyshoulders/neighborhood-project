// toggle the sidebar when button is clicked
document.getElementById('show-btn').addEventListener('click', toggleSidebar);

function toggleSidebar() {
  var sB = document.getElementById('sidebar');
  if (sB.style.display === "none") {
    sB.style.display = "block";
  } else {
    sB.style.display = "none";
  }
}

var fsPhone;

function getData(marker) {

  // instead, get the venueId from the marker
  var venueId = marker.venueId;

  var id = "&client_id=G00UBXWIKITPALICMOOROAKXX54N1LCXQIS4XRNWF2CAMS2A";
  var secret = "&client_secret=AZPV1I5KQ5WKIEZKXRW1TRBY1Q3XGNUHB2SQOKKQHMVH4S3V";
  var requestUrl = 'https://api.foursquare.com/v2/venues/' + venueId + '?v=20161016&' + id + secret;

  // response.venues[0].contact.formattedPhone
  $.ajax(requestUrl).done(function(result) {

    fsPhone = result.response.venue.contact.formattedPhone;

    marker.brewery.phone = fsPhone;
    infowindow.setContent(makeInfoString(marker.brewery));


    console.log(result);

    // // set info window content here
    // infowindow.setContent(self.brewInfoString);
    // // open info window here
    // infowindow.open(map, this);

  }).fail(function(error) {
    alert('OOPS! Foursquare info failed to load, refresh browser or try again later.');

  });

}


var Brewery = function(data) { // Brewery contructor that accesses brewers in model.js
  var self = this;
  this.name = data.name;
  this.address = data.address;
  this.hood = data.hood + " " + " ";
  this.style = 'Style: ' + data.style;
  this.website = '<a href="' + data.website + '" target="blank">Go to Website</a>';
  this.icon = data.icon;
  this.id = data.id;
  this.phone = this.result;
  this.marker = new google.maps.Marker({ // creates a new marker per brewery
    position: data.ll,
    brewery: self,
    map: map,
    icon: data.mapicon,
    animation: google.maps.Animation.DROP,
    venueId: data.id
    // add venueId here
  });

  this.marker.addListener('click', function() { //displays infowindow on click event
    var marker = this;

    // call getData here and pass the marker aka 'this' as an argument
    getData(this);

    // move to the ajax request's callback
    infowindow.setContent(self.brewInfoString); // sets content of infowindow

    // move to the ajax request's callback
    infowindow.open(map, this);


    setTimeout(function() { //closes infowindow after 10 secs.
      infowindow.close(map, this.marker);
    }, 10000);

    marker.setAnimation(google.maps.Animation.BOUNCE); // animation of marker on click
    setTimeout(function() {
      marker.setAnimation(null);
    }, 806);
  });

  this.brewInfoString = makeInfoString(self); //accesses the string content function

};

function makeInfoString(data) { //creates infoWindow content
  var content = '<div id="brewInfoWindow"><div id="brew-name"><em>' + data.name +
    '</em></div>' + '<div>' + data.address +
    '</div>' + '<div>' + data.hood +
    '</div>' + '<div>' + data.website +
    '</div>' + '<div>' + fsPhone +
    '</div></div>';
  return content;
}


var ViewModel = function() {
  var self = this;

  this.breweries = ko.observableArray(); // watches breweries array

  this.filterInput = ko.observable(''); // watches search bar for Filtering
  for (var i = 0; i < brewers.length; i++) {
    this.breweries.push(new Brewery(brewers[i]));
  }

  var bounds = new google.maps.LatLngBounds(); // creates bounds object for map

  this.breweries().forEach(function(brewery) { //loops over each brewery
    bounds.extend(brewery.marker.position);
  });

  map.fitBounds(bounds); // and changes bounds

  self.filterBrew = ko.computed(function() { // filters list view of breweries
    var filter = self.filterInput().toLowerCase(); //changes to lowercase for Filtering purposes
    return ko.utils.arrayFilter(self.breweries(), function(brewery) {
      var match = brewery.name.toLowerCase().indexOf(filter) !== -1 || brewery.hood.toLowerCase().indexOf(filter) !== -1 || brewery.style.toLowerCase().indexOf(filter) !== -1; // store the match state *help from Sarah in 1:1
      brewery.marker.setVisible(match);
      return match;
    });
  });

  self.showWindow = function(marker) { //displays infoWindow when list item is Clicked

    getData(this.marker);

    infowindow.setContent(this.brewInfoString);

    infowindow.open(map, this.marker);
    setTimeout(function() { //closes infowindow after 10 secs.
      infowindow.close(map, this.marker);
    }, 10000);

    this.marker.setAnimation(google.maps.Animation.BOUNCE); // animation of marker on click of list
    var toMarker = this.marker;
    setTimeout(function() {
      toMarker.setAnimation(marker);
    }, 806);

  }; // end of showWindow

}; // end of ViewModel

var map; // delclares global map var
var infowindow; //declares global infowindow var
var markers = []; // stores markers
var viewModel; //declares global viewModel


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

  viewModel = new ViewModel(); // sets new ViewModel

  ko.applyBindings(viewModel); //apply bindings to display map and markers and infowindows
}
