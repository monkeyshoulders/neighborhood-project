

var mapApi = "https://maps.googleapis.com/maps/api/js?key=AIzaSyBX6Y4qTu4NJsJdlXPJljmcYiivqSV-uo0&v=3";

$.getScript(mapApi).done(function() {
    initMap();

}).fail(function(error) {
    alert('Error loading Google Maps. Please refresh or try again later');
});

// v
