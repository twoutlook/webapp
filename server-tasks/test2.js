//test2, read file
fs = require('fs')
var routeLatLon={};



function getRouteDots(route){
  fs.readFile('route-stopname-lat-lon.json', 'utf8', function (err,data) {
    if (err) {
      return console.log(err);
    }
    routeLatLon=JSON.parse(data);
    // console.log(routeLatLon);
    console.log (routeLatLon[route]);
  });
}

getRouteDots(11062);
// getRouteDots(679);
