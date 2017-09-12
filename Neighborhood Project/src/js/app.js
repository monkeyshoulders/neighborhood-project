
ko.applyBindings(breweries);

var map;

function initMap() {
  map = new google.maps.Map(document.getElementById('map'), {
    center: {
      lat: 35.211505,
      lng: -80.825901
    },
    zoom: 13,
    mapTypeControl: false
  });
}

var Marker = function() {

}

var InfoWindow = function() {

}
