// Mark, 2016/1/18 23:54
var iconBase = 'https://maps.google.com/mapfiles/kml/shapes/';
//
var urlFirebase = "https://bus2016-c9.firebaseio.com/";
//
var app = angular.module("sampleApp", ["firebase"]);
app.controller("SampleCtrl", function ($scope, $firebaseArray) {
    var ref = new Firebase(urlFirebase);
    var refBusInfo = ref.child('current/BusInfo');
    var refBusInfoOrder = refBusInfo.orderByChild("BusID");
    //
    $scope.messages = $firebaseArray(refBusInfoOrder);


    $scope.BusID="001-FQ";




    //
    $scope.step1 = function (selectCar) {
        var refBus = refBusInfo.child( selectCar);
        refBus.on("child_added", function (snapshot, prevChildKey) {
            if (snapshot.key() == 'BusID') {
                $scope.BusID = snapshot.val();
            }
            if (snapshot.key() == 'Latitude') {
                $scope.Latitude = snapshot.val();
            }
            if (snapshot.key() == 'Longitude') {
                $scope.Longitude = snapshot.val();
            }
            if (snapshot.key() == 'DataTime') {
                $scope.DataTime = snapshot.val();
                var dt2 = mark_convert_BUSDATA_DataTime(snapshot.val())
                $scope.DataTimeV2 = dt2;
            }
        });
        //
        var myLatLng = {lat: $scope.Latitude, lng: $scope.Longitude};
        var map = new google.maps.Map(document.getElementById('map'), {
            center: myLatLng,
            zoom: 16
        });
        //
        var marker = new google.maps.Marker({
            position: myLatLng,
            map: map,
            icon: iconBase + 'bus.png'
        });
    }



    $scope.busClick =function (selectCar){
       // TODO
       var busNum="001-FQ";
       var busDate="2016-01-18";
       var startStr = busDate ;
       var endStr = startStr + " 23:59:59";
       console.log("startStr=" + startStr);
       console.log("endStr=" + endStr);

       var rul9=urlFirebase+"/"+busNum;
       console.log("rul9=" + rul9);
       var ref9 = new Firebase(rul9);

       var query = ref9.orderByChild("dt").startAt(startStr).endAt(endStr);
       var cnt=0;
//25.084425, 121.561544
//25.03315 121.6134
       var myLatLng = {lat: 25.03315, lng: 121.6134};
       var map = new google.maps.Map(document.getElementById('map'), {
           center: myLatLng,
           zoom: 13
       });

       query.on("child_added", function (snapshot, prevChildKey) {
          var val=snapshot.val() ;
          cnt++;
          console.log(cnt+" "+val.dt+" "+val.lat+" "+val.lon);

          if (cnt==0){

          }
          //
          var myLatLng = {lat: val.lat, lng: val.lon};
          var marker = new google.maps.Marker({
              position: myLatLng,
              map: map,
              icon: iconBase + 'placemark_circle_highlight.png'
          });



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
