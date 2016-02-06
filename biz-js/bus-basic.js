
var iconBus = "img/bus.png";


var map;
var anchorCnt = 0;
var iconBase = 'https://maps.google.com/mapfiles/kml/shapes/';  // if wrong here, no map shows

var initLatLng = {lat: 25.033718, lng: 121.565512};
//http://stackoverflow.com/questions/979256/sorting-an-array-of-javascript-objects
function compare(a, b) {
    if (a.routeName < b.routeName)
        return -1;
    else if (a.routeName > b.routeName)
        return 1;
    else
        return 0;
}
