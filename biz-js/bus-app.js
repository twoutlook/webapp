var busArray = [];
var allRoutes = {};
var ttlRouteCnt=0;


prepareDdlRoute();

var app = angular.module("sampleApp", ["firebase"]);
app.controller("SampleCtrl", function ($scope, $firebaseArray) {
//     $scope.lat = 25.033718;
//     $scope.lon = 121.565512;
//
//     // NOTE for bus dropdown list
//     // TODO TODAY
//     // $scope.routes = $firebaseArray(ref.child('routesv5/routes').orderByChild("routeName"));
//
// //ddlRouteChange
//     $scope.busCnt = 0;
//     $scope.routeCnt = 0;
//     $scope.activeRoute = 0;
//
//     var busArray = [];
//     var allRoutes = {};
//
//
//
//
//
//     var docX;
//     $scope.clearScreen = function () {
//         map = new google.maps.Map(document.getElementById('map'), {
//             center: initLatLng,
//             zoom: 14,
//             disableDefaultUI: true //https://developers.google.com/maps/documentation/javascript/controls
//         });
//         ddlRouteChange(docX)
//     }
//
//     $scope.ddlRouteChange = function (doc) {
//         map = new google.maps.Map(document.getElementById('map'), {
//             center: initLatLng,
//             zoom: 14,
//             disableDefaultUI: true //https://developers.google.com/maps/documentation/javascript/controls
//         });
//         docX = doc;
//         ddlRouteChange(doc);
//     }
//
//     var remLat;
//     var remLon;
//     $scope.majorRoute = -1;


});
