//    TODO    - Fix weather display
//            - Fit bounds to map


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


  // weather api call
  var api = "http://api.openweathermap.org/data/2.5/weather?lat=35.218939&lon=-80.842209&?id=524901&units=imperial&APPID=c23f6d23795d6a47a309155e714da031";

    $.ajax(api).done(function(result) {

      var temp = result.main.temp.toFixed(0);   // parse temp data to whole number
      var sky = result.weather[0].main;
      var weatherString = '<span>Weather: ' + temp + ' degrees' + ' & ' + sky + '</span>';
    
      $('.weather').append(weatherString);

      console.log(temp);
      console.log(sky);

    }).fail(function(error) {
      alert('OOPS! Weather info failed to load, refresh browser or try again later.');

    });


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

  this.marker.addListener('click', function() {  //displays infowindow on click event
    var marker = this;
    infowindow.setContent(self.brewInfoString); // sets content of infowindow
    infowindow.open(map, this);
    setTimeout(function() {                 //closes infowindow after 10 secs.
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

  self.filterBrew = ko.computed(function() { // filters list view of breweries
    var filter = self.filterInput().toLowerCase();
    return ko.utils.arrayFilter(self.breweries(), function(brewery) {
      var match = brewery.name.toLowerCase().indexOf(filter) !== -1 || brewery.hood.toLowerCase().indexOf(filter) !== -1 || brewery.style.toLowerCase().indexOf(filter) !== -1;   // store the match state *help from Sarah in 1:1
      brewery.marker.setVisible(match);
      return match;
    });
  });

  self.showWindow = function() { //displays infoWindow when list item is Clicked

    infowindow.setContent(this.brewInfoString);
    infowindow.open(map, this.marker);
    setTimeout(function() {                 //closes infowindow after 10 secs.
      infowindow.close(map, this.marker);
    }, 10000);

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


  function mapError() {
      alert('Error loading Google Maps. Check internet connection. Please try again later');
    }

  ko.applyBindings(new ViewModel());
}
