// var map;
// function initMap() {
//  map = new google.maps.Map(document.getElementById('map'), {
//    center: {lat: 35.223108, lng: -80.754541},
//    zoom: 7
//  });
//
//  var home = {lat: 35.223108, lng: -80.754541};
//  var marker1 = new google.maps.Marker({
//    position: home,
//    map: map,
//    title: 'uhhhhhhhh!'
//  });
//  var infowindow1 = new google.maps.InfoWindow({
//    content: 'Why your wife live here?'
//  });
//  marker1.addListener('click', function(){
//    infowindow1.open(map, marker1);
//  });
//
//  var paradise = {lat: 35.844107, lng: -75.562205};
//  var marker = new google.maps.Marker({
//    position: paradise,
//    map: map,
//    title: 'Paradise!'
//  });
//  var infowindow = new google.maps.InfoWindow({
//    content: 'Why your wife no live here?'
//  });
//  marker.addListener('click', function(){
//    infowindow.open(map, marker);
//  });
// }


var breweries = [
    {
      name: 'Sugar Creek Brewing Co.',
      lat: 35.185429,
      lng: -80.881015,
      address: '215 Southside Dr Charlotte, NC 28217',
      hood: 'Southend',
      website: 'https://sugarcreekbrewing.com/',
      style: 'Belgian',
      icon: '',
    },

    {
      name: 'Olde Meck Brewery',
      lat:35.187449,
      lng:-80.881815,
      address: '4150 Yancey Rd Charlotte, NC',
      hood: 'Southend',
      website: 'http://www.oldemeckbrew.com/',
      style: 'German',
      icon: '',

    },
    {
      name: 'Noda Brewing Co.',
      lat:35.240348,
      lng:-80.814849,
      address: '2229 N. Davidson St. Charlotte, NC 28205',
      hood: 'Noda',
      website: 'http://nodabrewing.com/',
      style: 'American',
      icon: '',

    },
    {
      name: 'Salud Cerveceria',
      lat:35.247799,
      lng:-80.804048,
      address: '3306-C N Davidson St, Charlotte, NC 28205',
      hood: 'Noda',
      website: 'https://saludcerveceria.com/',
      style: 'American',
      icon: '',

    },
    {
      name: 'Birdsong Brewing Co.',
      lat:35.230656,
      lng:-80.826525,
      address: '1016 N. Davidson St Charlotte, NC 28206',
      hood: 'Noda',
      website: 'https://birdsongbrewing.com/',
      style: 'American',
      icon: '',

    },
    {
      name: 'Lenny Boy Brewing Co.',
      lat:35.201444,
      lng:-80.873595,
      address: '3000 S. Tryon St Charlotte, NC 28217',
      hood: 'Southend',
      website: 'http://www.discoverlennyboy.com/',
      style: 'American',
      icon: '',

    },
    {
      name: 'Sycamore Brewing',
      lat:35.208722,
      lng:-80.862762,
      address: '2161 Hawkins Street Charlotte, NC, 28203',
      hood: 'Southend',
      website: 'https://www.sycamorebrew.com/',
      style: 'American',
      icon: '',

    },
    {
      name: 'Unknown Brewing',
      lat:35.220506,
      lng:-80.857539,
      address: '1327 S. Mint St Charlotte, NC 28203',
      hood: 'Uptown',
      website: 'http://www.unknownbrewing.com/',
      style: 'American',
      icon: '',

    },
    {
      name: 'Triple C Brewing',
      lat:35.201092,
      lng:-80.869570,
      address: '2900 Griffith St, Charlotte, NC 28203',
      hood: 'Southend',
      website: 'http://www.triplecbrewing.com/',
      style: 'American',
      icon: '',

    },
    {
      name: 'Wooden Robot Brewing',
      lat:35.216677,
      lng:-80.856644,
      address: '1440 S Tryon St #110 Charlotte, NC 28203',
      hood: 'Southend',
      website: 'https://woodenrobotbrewery.com/',
      style: 'Belgian',
      icon: '',

    },
    {
      name: 'Legion Brewing',
      lat:35.218387,
      lng:-80.812963,
      address: '1906 Commonwealth Ave Charlotte, NC 28205',
      hood: 'Plaza Midwood',
      website: 'http://legionbrewing.com/',
      style: 'American',
      icon: '',

    },
    {
      name: 'Resident Culture',
      lat:35.220203,
      lng:-80.805539,
      address: '2101 Central Ave Charlotte, NC 28205',
      hood: 'Plaza Midwood',
      website: 'https://www.residentculture.com/',
      style: 'American',
      icon: '',

    }
];
