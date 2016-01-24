// Mark, 2016/1/20 11:19
var iconCircle=iconBase + 'placemark_circle_highlight.png';
var iconBus="http://maps.google.com/mapfiles/kml/shapes/bus.png";
var urlFirebase = "https://bus-0119.firebaseio.com/";
//
var app = angular.module("sampleApp", ["firebase"]);
app.controller("SampleCtrl", function ($scope, $firebaseArray) {
    var ref = new Firebase(urlFirebase);
    // NOTE
    $scope.firstbus="...資料截入中,請稍候";
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
    $scope.buslist3x = $firebaseArray(ref.child('buslist3x').orderByChild("bus"));

    // NOTE 取一個 bus 出來
    var refBusNumList=ref.child("buslist3x");
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
            var dt2=dt.format("mm/dd HH:MM");

            // NOTE nested??? YES, IT WORKS!
            // https://bus-0119.firebaseio.com/bus-routes/routes/10142
            var refBusRoutes = ref.child("bus-routes/routes/" + doc.route);
            refBusRoutes.on("child_added", function (snapshot, prevChildKey) {
                var doc2 = snapshot.val();
                $scope.routeName = doc2.routeName;
                $scope.routeMsg ="<b><h3>【"+doc.bus+"】</h3>"
                              // +"<br>路線："+doc2.routeName
                              +"<br>起站："+doc2.startStop
                              +"<br>迄站："+doc2.endStop
                              +"<br><h3><a target='_blank' href='"+doc2.mapUrl+"' >查看路線圖</a></h3>"
                              +"<br>資料時間："+dt2
                              +"<br></b>"
                              ;
            });
        });
    }

    $scope.showLocation = function () {
      // makeMarker___Bus($scope.firstbus, $scope.unix, $scope.lat, $scope.lon, iconBus, true,true,$scope.routeMsg);
        makeMarkerV2($scope.firstbus, $scope.unix, $scope.lat, $scope.lon, iconBus, true,true,null,$scope.routeMsg,$scope.routeName);
    //  function makeMarker(bus,unix,            lat,        lon,        icon, toOpenNow,toMoveCenterNow,cnt,msg){//1453193
    }

    $scope.showAnchor = function () {
      //  initMap();
      // initLatLng
        map.setCenter(initLatLng);
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
    $scope.showTracking = function (selectCar,selectTracking) {
        var SHOW_DOT_CNT=1+ parseInt(selectTracking);
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
                makeMarker(val.bus, val.unix, val.lat, val.lon,null, true ,true,cnt,"");
            }else{
                makeMarker(val.bus, val.unix, val.lat, val.lon,iconCircle, false ,true,cnt,"");
            }
        });
    }
});
