// Mark, 2016/1/20 11:19
var iconCircle = 'img/placemark_circle_highlight.png';
var iconBus = "img/bus.png";

// var urlFirebase = "https://bus-0119.firebaseio.com/";

// var urlFirebase = "https://bus-v2-0128.firebaseio.com/";


//
var app = angular.module("sampleApp", ["firebase"]);
app.controller("SampleCtrl", function ($scope, $firebaseArray) {
    var ref = new Firebase(urlFirebase);
    // NOTE
    // $scope.firstbus = "...資料載入中,請稍候";
    // $scope.bus = "";
    // // Taipei 101
    // //lat: 25.033718, lng: 121.565512
    $scope.lat = 25.033718;
    $scope.lon = 121.565512;
    // $scope.bus = "";
    // $scope.unix = "";
    // $scope.route = "";
    // $scope.routeMsg = "...do nothing yet "

    // NOTE for bus dropdown list
    $scope.routes = $firebaseArray(ref.child('routesv5/routes').orderByChild("routeName"));

//ddlRouteChange
    $scope.busCnt = 0;
    $scope.activeRoute = 0;

    var busArray = [];

    var allRoutes = {};

    var refRoutes = ref.child("routesv5/");


    function showRouteBusList(){

    }

    $scope.showRouteBusList = function () {

    }




    var docX;
    $scope.clearScreen = function () {
        map = new google.maps.Map(document.getElementById('map'), {
            center: initLatLng,
            zoom: 14,
            disableDefaultUI: true //https://developers.google.com/maps/documentation/javascript/controls
        });

        ddlRouteChange(docX)
    }

    $scope.ddlRouteChange = function (doc) {
        map = new google.maps.Map(document.getElementById('map'), {
            center: initLatLng,
            zoom: 14,
            disableDefaultUI: true //https://developers.google.com/maps/documentation/javascript/controls
        });
        docX = doc;
        ddlRouteChange(doc);
    }

    var remLat;
    var remLon;
    function ddlRouteChange(doc) {
        $scope.busCnt = 0;
        var myDiv = document.getElementById("busCnt");
        myDiv.innerHTML =$scope.busCnt+"輛公車";

        var obj = JSON.parse(doc); // index.html 傳過來的是String, 要先當成 json obj 好應用
        var route = parseInt(obj.routeId);// routeId 過來時是文本,要轉成 integer
        var refBustlist = ref.child("buslistv6/");
        refBustlist.once("child_added", function (snapshot, prevChildKey) { // 就只有一個doc
            var key = snapshot.key();
            var val = snapshot.val();
            var array = val;
            // console.log(val);
            var toOpen = true;
            for (var i = 0; i < array.length; i++) {
                var bus = array[i];
                if (bus['route'] == obj.routeId) {

                    $scope.busCnt++;
                    var myDiv = document.getElementById("busCnt");
                    myDiv.innerHTML =$scope.busCnt+"輛公車";


                    var dt = new Date(parseInt(bus.unix));
                    var dt2 = dt.format("yyyy-mm-dd<br><b>HH:MM</b>:ss");
                    var msg = ""
                    // + "<div><h4>"
                    + "<div>"
                    + "<a target='_blank' href='" + obj.mapUrl + "' >"
                            + "<b>【" + obj.routeName + "】</b><br>"
                            // +obj.startStop
                            // +"<br>|"
                            // +"<br>"+obj.endStop
                            + obj.startStop
                            + "<br>|"
                            + "<br>" + obj.endStop
                            + "</a>"
                            + "</div>"
                            + "<b>【" + bus.bus + "】</b>"
                            + "<br>" + dt2
                            + "</div>"
                            ;

                    console.log("i=" + i);
                    makeMarkerV2(bus.bus, bus.unix, bus.lat, bus.lon, iconBus, toOpen, true, null, msg);


                      $scope.lat=bus.lat;
                      $scope.lon=bus.lon;


                    // toOpen=false;

                }
            }
            map.setCenter({lat: $scope.lat, lng: $scope.lon});
        }); // end of once
    }

    $scope.showAnchor = function () {
        //  initMap();
        // initLatLng
        map.setCenter(initLatLng);

        // RESET ALL
        anchorCnt++; // it won't show info window again
        console.log("anchorCnt=" + anchorCnt);
        //
        var rulX = urlFirebase + 'buslist';
        var refList = new Firebase(rulX);
        var cnt = 0;
        refList.on("child_added", function (snapshot, prevChildKey) {
            var key = snapshot.key();
            // console.log("key=" + key);
            ref.child(key).off();
        });
        initMap();
    }

    $scope.resetAll = function () {

        var rulX = urlFirebase + 'buslist';
        var refList = new Firebase(rulX);
        var cnt = 0;
        refList.on("child_added", function (snapshot, prevChildKey) {
            var key = snapshot.key();
            // console.log("key=" + key);
            ref.child(key).off();
        });
        initMap();
    }

//     // NOTE TO SHOW ALL MARKS
//     $scope.showTracking = function (selectCar) {
//         // var SHOW_DOT_CNT=1+ parseInt(selectTracking);
//         var SHOW_DOT_CNT = 30;
//
//         var ref2 = ref.child($scope.firstbus)
//         var query = ref2.endAt().limitToLast(SHOW_DOT_CNT);
//         var cnt = 0;
//         query.on("child_added", function (snapshot, prevChildKey) {
//             var val = snapshot.val();
//
//             $scope.bus = val.bus;
//             $scope.lat = val.lat;
//             $scope.lon = val.lon;
//             $scope.unix = val.unix;
//             // $scope.route = val.route;
//             // $scope.routeMsg = "";
//             //https://bus-0119.firebaseio.com/bus/routes/111520
//             var refRoute = ref.child("bus/routes/" + val.route);
//             cnt++;
//             // console.log ( "cnt = "+cnt);
//             // var dt=new Date(parseInt(val.unix));
//             // var  dt2=dt.format("mm/dd HH:MM:ss");
//             if (cnt == 1) {
//                 makeMarker(val.bus, val.unix, val.lat, val.lon, iconCircle, true, false, cnt, "");
//             } else if (cnt > SHOW_DOT_CNT) {
// //              makeMarker(val.bus, val.unix, val.lat, val.lon,null, true ,true,cnt,"");
// // NOT TO OPEN
//                 makeMarker(val.bus, val.unix, val.lat, val.lon, null, false, true, cnt, "");
//
//
//             } else {
//                 makeMarker(val.bus, val.unix, val.lat, val.lon, iconCircle, false, true, cnt, "");
//             }
//         });
//     }
});
