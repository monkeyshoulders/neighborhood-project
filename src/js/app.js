//    TODO:
//           4. Use FourSquare API
//           5. Error handling message
//           6. README
//           7. Mobile and Tablet Version



// var request = new XMLHttpRequest();
// var fourSquarePic = [];
// var fourSquareQuery = function() {
//   for (var i = 0; i < brewers.ll.length; i++) {
//   //  brewers.ll.[i] //contruct the request with the lat lng of every brewery and save the href of the first picture in an fourSquarePic array https://developer.foursquare.com/docs/api/venues/photos
//
//     // curl -X GET -G \
//     //   'https://api.foursquare.com/v2/venues/explore' \
//     //     -d client_id="G00UBXWIKITPALICMOOROAKXX54N1LCXQIS4XRNWF2CAMS2A" \
//     //     -d client_secret="AZPV1I5KQ5WKIEZKXRW1TRBY1Q3XGNUHB2SQOKKQHMVH4S3V" \
//     //     -d v="20170801" \
//     //     -d ll="40.7243,-74.0018" \
//     //     -d query="coffee" \
//     //     -d limit=1
//
//   }
// }
// request.open('GET', fourSquareQuery);
// request.onload = function() {
//   var fourSquareData = JSON.parse(request.responseText);
// };
//
// //request.send();



function getData(city, query, data) {

         var CLIENT_ID = 'G00UBXWIKITPALICMOOROAKXX54N1LCXQIS4XRNWF2CAMS2A',
           CLIENT_SECRET = 'AZPV1I5KQ5WKIEZKXRW1TRBY1Q3XGNUHB2SQOKKQHMVH4S3V',
           version = '20170801',
           city = city,
           query = query,
           base_url = "https://api.foursquare.com/v2/venues";

         $.ajax({
           url: base_url + '/search',
           dataType: 'json',
           data: {
             client_id: CLIENT_ID,
             client_secret: CLIENT_SECRET,
             near: city,
             v: version,
             query: query
           }
         }).done(function(result) {

          var venues = result.response.venues;
           console.log(venues);

           venues.forEach(function(venue) {
            data.push(new Brewery(venue))
           })


         }).fail(function(error) {
            console.log(error);
         });
}

// put the data collected from FourSquare into the infowindow as an image

var Brewery = function(data) { // Brewery contructor that accesses brewers in model.js
  var self = this;
  this.id = data.id;
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

  this.marker.addListener('click', function() {
    var marker = this;
    infowindow.setContent(self.brewInfoString); // sets content of infowindow
    infowindow.open(map, this);

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
};


var ViewModel = function() {
  var self = this;

  this.breweries = ko.observableArray(); // watches breweries array
  this.filterInput = ko.observable(''); // watches search bar for Filtering
  //for (var i = 0; i < brewers.length; i++) {
  //  this.breweries.push(new Brewery(brewers[i]));
  //}

  getData('Charlotte', 'brewery', this.breweries);


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

  // if (/*map*/ !== 'undefined') {  // Error handling for map not loading
  //   ko.applyBindings(new ViewModel());
  // } else {
  //     alert('Error loading Google Maps. Check internet connection. Please try again later');
  // }
ko.applyBindings(new ViewModel());
}
