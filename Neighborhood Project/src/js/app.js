var Brewery = function(data) {
  var self = this;
  this.name = data.name;
  this.hood = data.hood + "  | ";
  this.style = 'Style: ' + data.style;
  this.website = data.website;
  // this.ll = data.ll;
  this.icon = data.icon;
};



var ViewModel = function() {
  var self = this;

  this.breweries = ko.observableArray();

  for (var i = 0; i < brewers.length; i++) {
    this.breweries.push(new Brewery(brewers[i]));
  }




  // http://knockoutjs.com/documentation/click-binding.html#note-1-passing-a-current-item-as-a-parameter-to-your-handler-function

  // Filtering an array: http://www.knockmeout.net/2011/04/utility-functions-in-knockoutjs.html
  // http://knockoutjs.com/documentation/computedObservables.html
  // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/indexOf

};

ko.applyBindings(new ViewModel());


var map;
var markers = [];

function initMap() {
  map = new google.maps.Map(document.getElementById('map'), {
    center: {
      lat: 35.211505,
      lng: -80.825901
    },
    zoom: 13,
    mapTypeControl: false
  });
  // markers
  for (var i = 0; i < brewers.length; i++) {
         var position = brewers[i].ll;
         var marker = new google.maps.Marker({
           position: position,
           map: map,
           icon: brewers[i].mapicon,
           animation: google.maps.Animation.DROP,
         });
         markers.push(marker);

         marker.addListener('click', function() {
            infoWindow.open(map, marker);
          });

        }

    // var window = function(){
    //   for (var i = 0; i < brewers.length; i++) {
    //     var info = '<h3>brewers[i].name</h3>';
    //   }
    // };
    //
    // var infoWindow = new google.maps.InfoWindow({
    //   content: window
    // });

}
