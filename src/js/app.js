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
;

 this.marker.addListener('click', function() {
            infoWindow.open(map, this);
          });

};

var ViewModel = function() {
  var self = this;

 this.breweries = ko.observableArray();
  this.filterInput = ko.observable('');
  for (var i = 0; i < brewers.length; i++) {
    this.breweries.push(new Brewery(brewers[i]));
  }

  self.filterBrew = ko.computed(function(){
      var filter = self.filterInput().toLowerCase();
      console.log(self.breweries())
      return ko.utils.arrayFilter(self.breweries(), function(brewery) {
        var match = brewery.name.toLowerCase().indexOf(filter) !== -1;    // store the match state
        brewery.marker.setVisible(match);
        console.log(brewery, match)
        return match;
      })
  });


 self.showWindow = function(location) {
    google.maps.event.trigger(location.marker,'click');
  }

 // http://knockoutjs.com/documentation/click-binding.html#note-1-passing-a-current-item-as-a-parameter-to-your-handler-function

 // Filtering an array: http://www.knockmeout.net/2011/04/utility-functions-in-knockoutjs.html
  // http://knockoutjs.com/documentation/computedObservables.html
  // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/indexOf

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
