// Mark, 2016/1/20 11:19
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
        showBus();
    }

    $scope.latLonClick = function () {
        showBus();
    }

    function showBus() {
        makeMarker($scope.bus, $scope.unix, $scope.lat, $scope.lon, 'bus.png', 1);
    }

    $scope.showAnchor = function () {
        initMap();
    }
    $scope.showTeam = function () {
        initTeam();
    }



    // function toggleBounce() {
    //     if (marker.getAnimation() !== null) {
    //         marker.setAnimation(null);
    //     } else {
    //         marker.setAnimation(google.maps.Animation.BOUNCE);
    //     }
    // }


    // TO SHOW ALL MARKS
    $scope.busClick = function (selectCar) {
        // TODO
        //  var busNum="001-FQ";
        //  var busDate="2016-01-18";
        //  var startStr = busDate ;
        //  var endStr = startStr + " 23:59:59";
        //  console.log("startStr=" + startStr);
        //  console.log("endStr=" + endStr);

        var rul9 = urlFirebase + "/" + selectCar;
        console.log("rul9=" + rul9);
        var ref9 = new Firebase(rul9);
        // var query = ref9.orderByChild('unix').endAt().limit(60);
        var query = ref9.endAt().limit(15);

        //
//http://stackoverflow.com/questions/25611356/display-posts-in-descending-posted-order
  console.log("========================================");
        query.on("child_added", function (snapshot, prevChildKey) {
            var val = snapshot.val();
            makeMarker(val.bus, val.unix, val.lat, val.lon, 'placemark_circle_highlight.png', 1);//1 setCenter

        });

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
