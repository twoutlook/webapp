// Mark, 2016/1/20 11:19
var iconCircle= 'img/placemark_circle_highlight.png';
var iconBus="img/bus.png";

// var urlFirebase = "https://bus-0119.firebaseio.com/";

var urlFirebase = "https://bus-v2-0128.firebaseio.com/";


//
var app = angular.module("sampleApp", ["firebase"]);
app.controller("SampleCtrl", function ($scope, $firebaseArray) {
    var ref = new Firebase(urlFirebase);
    // NOTE
    $scope.firstbus="...資料載入中,請稍候";
      $scope.bus="";
    // Taipei 101
    //lat: 25.033718, lng: 121.565512
    $scope.lat = 25.033718;
    $scope.lon = 121.565512;
    $scope.bus = "";
    $scope.unix="";
    $scope.route="";
    $scope.routeMsg ="...do nothing yet "

    // NOTE for bus dropdown list
    $scope.buslistv4 = $firebaseArray(ref.child('buslistv4').orderByChild("bus"));

    $scope.routesv4 = $firebaseArray(ref.child('routesv4').orderByChild("routeName"));

    // NOTE 取一個 bus 出來
    var refBusNumList=ref.child("buslistv4");
    refBusNumList.limitToFirst(1).once("child_added", function(snapshot) {
        var val=snapshot.val();
        $scope.firstbus=val.bus;
        $scope.bus=val.bus;
        ddlBusChange(val.bus) ;
    });



    // NOTE 選擇了bus,即顯示,準備定點可以快速在地圖回到中心點
    $scope.ddlBusChange = function (bus) {
      $scope.firstbus=bus;
      $scope.bus=bus;
      ddlBusChange(bus);
    }

//ddlRouteChange
$scope.busCnt=0;
$scope.activeRoute=0;

var busArray=[];

var allRoutes={};

var refRoutes = ref.child("routesv5/");

// console.log("routesv5 =======================");
// refRoutes.once("child_added", function (snapshot, prevChildKey) {
//   // $scope.busCnt++;
//   var key = snapshot.key();
//   var val = snapshot.val();
//   // var
//   // console.log(val['mapUrl']);
//   //   console.log(JSON.stringify(val));
//   allRoutes=snapshot.val();
//
//
//
//   console.log(val);
//   console.log("numChildren="+snapshot.numChildren());
//   console.log("prepare onhand db...");
//   // for (var i = 0; i < array.length; i++) {
//   for (var i = 0; i < 1; i++) {
//     console.log(i);
//     console.log(allRoutes[i]);
//   }
//
//
// });

var docX;
$scope.clearScreen = function () {
  // initMap();

  map = new google.maps.Map(document.getElementById('map'), {
    center: initLatLng,
    zoom: 14,
     disableDefaultUI: true //https://developers.google.com/maps/documentation/javascript/controls
  });

  ddlRouteChange (docX)
}

$scope.ddlRouteChange = function (doc) {
  map = new google.maps.Map(document.getElementById('map'), {
    center: initLatLng,
    zoom: 14,
     disableDefaultUI: true //https://developers.google.com/maps/documentation/javascript/controls
  });
  docX=doc;
  ddlRouteChange (doc);
}

function ddlRouteChange (doc){
  var obj = JSON.parse(doc);
  var route=parseInt(obj.routeId);
  var refBustlist = ref.child("buslistv6/");


  // refBustlist.orderByChild("route").startAt(route).endAt(route).on("child_added", function (snapshot, prevChildKey) {
    refBustlist.once("child_added", function (snapshot, prevChildKey) {

    var key = snapshot.key();
    var val = snapshot.val();
    var array=val;
    // console.log(val);
    var toOpen=false;
    for (var i = 0; i < array.length; i++) {
      var bus=array[i];
      if (bus['route']==obj.routeId){

// Object {bus: "191-FY", lat: 25.023092, lon: 121.570015, route: 10832, unix: "1453985247000"}
        // console.log(bus);
        // console.log(bus['bus']);
        // console.log(bus.bus);
        var dt=new Date(parseInt(bus.unix));
        // var dt2=dt.format("yyyy-mm-dd<br>HH:MM:ss");
        var  dt2=dt.format("yyyy-mm-dd<br><b>HH:MM</b>:ss");




    var msg =""
                  +"<div ><h4>"
                  +"<a target='_blank' href='"+obj.mapUrl+"' >"
                  +"<h3>【"+obj.routeName+"】</h3>"
                  // +obj.startStop
                  // +"<br>|"
                  // +"<br>"+obj.endStop
                  +obj.startStop
                  +"<br>|"
                  +"<br>"+obj.endStop
                  +"</a>"
                  +"</div>"
                  +"<b>【"+bus.bus+"】</b>"
                  +"<br>"+dt2
                  +"</h4>"
                  ;
    makeMarkerV2(bus.bus,   bus.unix, bus.lat, bus.lon, iconBus, toOpen,true,null,msg);
    // toOpen=false;
    // busArray[val.bus]=true;
      // console.log("busArray.length=" + busArray.length);
    }
  }

  });
}



    function ddlBusChange(bus) {
        console.log("**********************ddlBusChange bus=" + bus);
        $scope.bus = bus;
        var refBus = ref.child("buslist/" + bus);
        refBus.on("child_added", function (snapshot, prevChildKey) {
            var doc = snapshot.val();
            $scope.lat = doc.lat;
            $scope.lon = doc.lon;
            $scope.unix = doc.unix;
            $scope.route = doc.route;
            // NOTE 得到像 01/23 19:57
            var dt=new Date(parseInt(doc.unix));
            // var dt2=dt.format("yyyy-mm-dd<br>HH:MM:ss");
            var  dt2=dt.format("yyyy-mm-dd<br><b>HH:MM</b>:ss");

            // NOTE nested??? YES, IT WORKS!
            // https://bus-0119.firebaseio.com/bus-routes/routes/10142
            var refBusRoutes = ref.child("bus-routes/routes/" + doc.route);
            refBusRoutes.on("child_added", function (snapshot, prevChildKey) {
                var doc2 = snapshot.val();
                $scope.routeName = doc2.routeName;
                $scope.routeName = "<a target='_blank' href='"+doc2.mapUrl+"' >"+doc2.routeName+"</a>";

                $scope.routeMsg =""
                              // +"<br>路線："+doc2.routeName
                              // +"<br>起站："+doc2.startStop
                              // +"<br>迄站："+doc2.endStop
                              // +"<div style='background-color:#00802b; color:white;'><h4>"+doc2.startStop//#00802b
                              +"<div ><h4>"
                              +"<a target='_blank' href='"+doc2.mapUrl+"' >"
                              +doc2.startStop


                              +"<br>|"
                              +"<br>"+doc2.endStop
                              +"</a>"
                              +"</div>"
                              // +"<br><h4><a target='_blank' href='"+doc2.mapUrl+"' >查看路線圖</a></h4>"
                              +"<b>【"+doc.bus+"】</b>"
                              // +"<br>資料時間："+dt2
                              +"<br>"+dt2
                              +"</h4>"
                              ;
            });
        });
    }

    $scope.showLocation = function () {
      // makeMarker___Bus($scope.firstbus, $scope.unix, $scope.lat, $scope.lon, iconBus, true,true,$scope.routeMsg);
        makeMarkerV2($scope.firstbus, $scope.unix, $scope.lat, $scope.lon, "img/bus.png", true,true,null,$scope.routeMsg,$scope.routeName);
    //  function makeMarker(bus,unix,            lat,        lon,        icon, toOpenNow,toMoveCenterNow,cnt,msg){//1453193
    }

    $scope.showAnchor = function () {
      //  initMap();
      // initLatLng
        map.setCenter(initLatLng);

        // RESET ALL
        anchorCnt++; // it won't show info window again
        console.log("anchorCnt="+anchorCnt);
        //
        var rulX = urlFirebase +  'buslist';
        var refList = new Firebase(rulX);
        var cnt=0;
        refList.on("child_added", function (snapshot, prevChildKey) {
            var key = snapshot.key();
            // console.log("key=" + key);
            ref.child(key).off();
        });
        initMap();
    }

    $scope.showTeam = function () {
        initTeam();
    }

    $scope.resetAll = function () {

        var rulX = urlFirebase +  'buslist';
        var refList = new Firebase(rulX);
        var cnt=0;
        refList.on("child_added", function (snapshot, prevChildKey) {
            var key = snapshot.key();
            // console.log("key=" + key);
            ref.child(key).off();
        });
        initMap();
    }

    // NOTE TO SHOW ALL MARKS
    $scope.showTracking = function (selectCar) {
        // var SHOW_DOT_CNT=1+ parseInt(selectTracking);
        var SHOW_DOT_CNT=30;

        var ref2=ref.child($scope.firstbus)
        var query = ref2.endAt().limitToLast(SHOW_DOT_CNT);
        var cnt=0;
        query.on("child_added", function (snapshot, prevChildKey) {
            var val = snapshot.val();

            $scope.bus =val.bus;
            $scope.lat = val.lat;
            $scope.lon = val.lon;
            $scope.unix = val.unix;
            // $scope.route = val.route;
            // $scope.routeMsg = "";
            //https://bus-0119.firebaseio.com/bus/routes/111520
            var refRoute = ref.child("bus/routes/"+val.route);
            cnt++;
            // console.log ( "cnt = "+cnt);
            // var dt=new Date(parseInt(val.unix));
            // var  dt2=dt.format("mm/dd HH:MM:ss");
            if ( cnt==1){
              makeMarker(val.bus, val.unix, val.lat, val.lon,iconCircle, true ,false,cnt,"");
            }else if ( cnt>SHOW_DOT_CNT){
//              makeMarker(val.bus, val.unix, val.lat, val.lon,null, true ,true,cnt,"");
// NOT TO OPEN
              makeMarker(val.bus, val.unix, val.lat, val.lon,null, false ,true,cnt,"");


            }else{
                makeMarker(val.bus, val.unix, val.lat, val.lon,iconCircle, false ,true,cnt,"");
            }
        });
    }
});
