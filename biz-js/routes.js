// Mark, 2016/1/23 10:23

// (1) set URL and REF
// var urlFirebase = "https://bus-0119.firebaseio.com/";
var URL ="https://bus-0119.firebaseio.com/bus/ROUTE/BusInfo";
var REF = new Firebase(URL);

var URL2 ="https://bus-0119.firebaseio.com/current/BusInfo";
var REF2 = new Firebase(URL2);


// (2) Angular Module
var app = angular.module("sampleApp", ["firebase"]);

// (3) Angular Controller
app.controller("SampleCtrl", function ($scope, $firebaseArray) {

    //

    // $scope.routes = $firebaseArray(REF.limitToFirst(10));
    // $scope.routes = $firebaseArray(REF.limitToFirst(3000));
    // $scope.buses = $firebaseArray(REF2.limitToFirst(6000));

$scope.routeId=157860;

    // Basic usage of .once() to read the data located at firebaseRef.
    REF.once('value', function(dataSnapshot) {
      var key=dataSnapshot.key();
      var array=dataSnapshot.val();
      console.log (key);

      for (var i = 0; i < array.length; i++) {
        var doc=array[i]
        // if (doc.Id==10824){
        //   console.log ( i +" "+doc);
        // }
        if (doc.pathAttributeId==$scope.routeId){
          console.log ( i +" "+doc.pathAttributeId);
        }

      }


    });
});
