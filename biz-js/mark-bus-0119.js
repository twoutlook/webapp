// Mark, 2016/1/20 11:19
var iconCircle=iconBase + 'placemark_circle_highlight.png';
//
var urlFirebase = "https://bus-0119.firebaseio.com/";
//
var app = angular.module("sampleApp", ["firebase"]);
app.controller("SampleCtrl", function ($scope, $firebaseArray) {
    var ref = new Firebase(urlFirebase);
    var refBuslist = ref.child('buslist');
    $scope.busList = $firebaseArray(refBuslist);

    // Taipei 101
    //lat: 25.033718, lng: 121.565512
    $scope.lat = 25.033718;
    $scope.lon = 121.565512;
    $scope.bus = "";
      $scope.unix="";

    // 選擇了bus,即顯示,準備定點可以快速在地圖回到中心點
    $scope.ddlBusChange = function (bus) {
        console.log("**********************bus=" + bus);
        $scope.bus = bus;
        var refBus = ref.child("buslist/" + bus);
        refBus.on("child_added", function (snapshot, prevChildKey) {
            var doc = snapshot.val();
            // console.log("**********************bus=" + doc);
            $scope.lat = doc.lat;
            $scope.lon = doc.lon;
            $scope.unix = doc.unix;
        });
        // showBus();
    }

    var tracking=[

      {num:10},

      {num:20},
      {num:30},
      {num:40},
      {num:50},
      {num:60},
      {num:70},
      {num:80},
      {num:90},
      {num:100},
      {num:110},
      {num:120},
      {num:180},
      {num:240},
      {num:300},
      {num:360},
      {num:420},
      {num:480},
      {num:720},
      {num:1440}



    ];

  $scope.Tracking=tracking;

    $scope.showLastPosition = function () {
        makeMarker($scope.bus, $scope.unix, $scope.lat, $scope.lon, null, true,true);
      }

    // function moveLastPostionToCenter() {
    //     makeMarker($scope.bus, $scope.unix, $scope.lat, $scope.lon, null, true,true);
    //     //function makeMarker(bus,unix,lat,lon,icon,toOpenNow,toMoveCenterNow)
    // }

    $scope.showAnchor = function () {
      //  initMap();
      var marker = new google.maps.Marker({
          position: initLatLng,
          map: map,
          // draggable: true,
          animation: google.maps.Animation.DROP,
          icon: iconBase + 'marina.png',//marina.png

      });
        // marker.addListener('click', toggleBounce);
       map.setCenter(marker.getPosition());
    }
    $scope.showTeam = function () {
        initTeam();
    }
    $scope.resetAll = function () {

      var rulX = urlFirebase +  'buslist';
      // console.log("rul9=" + rul9);
      var refList = new Firebase(rulX);
      var cnt=0;
      refList.on("child_added", function (snapshot, prevChildKey) {
          var key = snapshot.key();
          // console.log("key=" + key);
          ref.child(key).off();
      });




        initMap();
    }


    // function toggleBounce() {
    //     if (marker.getAnimation() !== null) {
    //         marker.setAnimation(null);
    //     } else {
    //         marker.setAnimation(google.maps.Animation.BOUNCE);
    //     }
    // }


    // TO SHOW ALL MARKS
    $scope.busClick = function (selectCar,selectTracking) {
      if(selectTracking === undefined){
        selectTracking=10;
      }
      // console.log("selectCar=" + selectCar);
      // console.log("selectTracking=" + selectTracking);

        var SHOW_DOT_CNT= parseInt(selectTracking);

        var rul9 = urlFirebase +  selectCar;
        // console.log("rul9=" + rul9);
        var ref9 = new Firebase(rul9);
        // var query = ref9.orderByChild('unix').endAt().limit(60);
        var query = ref9.endAt().limitToLast(SHOW_DOT_CNT);

        //
//http://stackoverflow.com/questions/25611356/display-posts-in-descending-posted-order
  // console.log("========================================");
        var cnt=0;
        query.on("child_added", function (snapshot, prevChildKey) {
            var val = snapshot.val();

            cnt++;
            var dt=new Date(parseInt(val.unix));
            var  dt2=dt.format("mm/dd HH:MM:ss");
            // console.log(cnt+" => "+val.bus +" "+dt2);

//iconBase + 'placemark_circle_highlight.png
//function makeMarker(bus,unix,lat,lon,icon,toOpenNow,toMoveCenterNow)
            if ( cnt==1){
              makeMarker(val.bus, val.unix, val.lat, val.lon,iconCircle, true ,false);
            }else if ( cnt>=SHOW_DOT_CNT){
                makeMarker(val.bus, val.unix, val.lat, val.lon,null, true ,false);
            }else{
                makeMarker(val.bus, val.unix, val.lat, val.lon,iconCircle, false ,false);
            }
            $scope.bus =val.bus;
            $scope.lat = val.lat;
            $scope.lon = val.lon;
            $scope.unix = val.unix;
        });
          makeMarker($scope.bus, $scope.unix, $scope.lat, $scope.lon, null, true,true);//moveLastPostionToCenter();


    }

    $scope.check = function (selectCar, selectDate, selectHour) {
        console.log("===============DOING  =>" + selectCar + " " + selectDate + " " + selectHour);
//https://www.firebase.com/docs/web/libraries/angular/guide/synchronized-arrays.html

        var ref2 = ref.child(selectCar);

        // var query=ref2.orderByChild("dt").startAt(selectDate+" "+selectHour).on("child_added", function(snapshot) {
        var startStr = selectDate + " " + selectHour;
        var endStr = startStr + ":59:59";

        //  var endStr="2016-01-17 21"
        console.log("startStr=" + startStr);
        console.log("endStr=" + endStr);
        var query = ref2.orderByChild("dt").startAt(selectDate + " " + selectHour).endAt(endStr);
        // var query=ref2.orderByChild("dt").startAt(selectDate+" "+selectHour);

        $scope.results = $firebaseArray(query);



    }





});
