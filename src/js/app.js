var breweries = [
  {
    name: 'Sugar Creek Brewing Co.',
    ll: {
      lat: 35.185429,
      lng: -80.881015
    },
    address: '215 Southside Dr Charlotte, NC 28217',
    hood: 'Southend',
    website: 'https://sugarcreekbrewing.com/',
    style: 'Belgian',
    icon: '',
  },

function locations(name) {
  this.name = breweries.name;
}

ko.applyBindings(new locations);


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
