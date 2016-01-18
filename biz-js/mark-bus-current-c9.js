
// console.log("...bus-current-c9");




var app = angular.module("sampleApp", ["firebase"]);

app.controller("SampleCtrl", function($scope, $firebaseArray) {
  // let user know current ...
  $scope.sysinfo="...init bus l";
  var url="https://bus2016-c9.firebaseio.com/";
  var ref = new Firebase(url);
//  var query=ref2.orderByChild("dt").startAt(selectDate+" "+selectHour).endAt(endStr);

  var refBusInfo=ref.child('current/BusInfo');
  var refBusInfoOrder=refBusInfo.orderByChild("BusID");
  $scope.messages = $firebaseArray(refBusInfoOrder);

  $scope.results=[];
    $scope.BusID="";
    $scope.DataTimeV2="";
      $scope.DataTime="";
//  $scope.BusID="";
  $scope.step1 = function (selectCar) {
      // console.log("...DOING step1 selectCar =>"+selectCar);
      // var refCar=refBusInfo.child(selectCar);
      // //  $scope.onebus = $firebaseArray(refCar);
      // $scope.results = $firebaseArray(refCar);
      var refBus=ref.child('current/BusInfo/'+selectCar);

      refBus.on("child_added", function(snapshot, prevChildKey) {
        // console.log("???" + snapshot.key()+" "+snapshot.val());
        if (snapshot.key()=='BusID'){
            $scope.BusID=snapshot.val();
        }
        if (snapshot.key()=='Latitude'){
            $scope.Latitude=snapshot.val();
        }
        if (snapshot.key()=='Longitude'){
            $scope.Longitude=snapshot.val();
        }
        if (snapshot.key()=='DataTime'){
            $scope.DataTime=snapshot.val();
            // console.log($scope.DataTime);
            var dt2=mark_convert_BUSDATA_DataTime(snapshot.val())
              // console.log(dt2);
            $scope.DataTimeV2=dt2;
        }


      });
      var myLatLng = {lat: $scope.Latitude, lng: $scope.Longitude};
      map = new google.maps.Map(document.getElementById('map'), {
       // center: {lat: -34.397, lng: 150.644},
       center: myLatLng,
       zoom: 16
      });

      var marker = new google.maps.Marker({
        position: myLatLng,
        map: map,
        icon: iconBase + 'bus.png'
      });

  }





  $scope.check = function (selectCar,selectDate,selectHour) {
      console.log("===============DOING  =>"+selectCar+" "+selectDate+" "+selectHour);
//https://www.firebase.com/docs/web/libraries/angular/guide/synchronized-arrays.html

      var ref2=ref.child(selectCar);

      // var query=ref2.orderByChild("dt").startAt(selectDate+" "+selectHour).on("child_added", function(snapshot) {
      var startStr=selectDate+" "+selectHour;
      var endStr=startStr+":59:59";

    //  var endStr="2016-01-17 21"
      console.log("startStr="+startStr);
        console.log("endStr="+endStr);
      var query=ref2.orderByChild("dt").startAt(selectDate+" "+selectHour).endAt(endStr);
      // var query=ref2.orderByChild("dt").startAt(selectDate+" "+selectHour);

      $scope.results = $firebaseArray(query);



  }





});
