// Mark, 2016/1/18 23:54
//var map;

var iconBase = 'https://maps.google.com/mapfiles/kml/shapes/';
//
var urlFirebase = "https://bus-0119.firebaseio.com/";
//
var app = angular.module("sampleApp", ["firebase"]);
app.controller("SampleCtrl", function ($scope, $firebaseArray) {
    var ref = new Firebase(urlFirebase);
    var refBuslist = ref.child('buslist');
    $scope.busList = $firebaseArray(refBuslist);


    // var refBusInfoOrder = refBusInfo.orderByChild("BusID");
    //
    // Taipei 101
    //lat: 25.033718, lng: 121.565512
    $scope.lat=25.033718;
    $scope.lon=121.565512;

    // map = new google.maps.Map(document.getElementById('map'), {
    //     center: {lat:$scope.lat, lng:$scope.lon},
    //     zoom: 13
    // });



    $scope.bus="";
    $scope.ddlBusChange = function (bus) {
      console.log("bus=" + bus);
      $scope.bus=bus;
      var refBus = ref.child( "buslist/"+bus);
      refBus.on("child_added", function (snapshot, prevChildKey) {
          var doc=snapshot.val();
          // console.log("key=" + snapshot.key());
          // console.log("lat=" + doc.lat);
          // console.log("lon=" + doc.lon);
          // console.log("unix=" + doc.unix);
          $scope.lat=doc.lat;
          $scope.lon=doc.lon;
          $scope.unix=doc.unix;

      });
      showBus();
      //$scope.bus=bus;
    }

  $scope.latLonClick =   function () {
    showBus();
  }

  function showBus(){
    makeMarker($scope.bus,$scope.unix,$scope.lat,$scope.lon,'bus.png',1);
  }

function makeMarker(bus,unix,lat,lon,img,moveCenter){//1453193870000
                              //1453194522000
console.log("unix "+unix);
  var temp=parseInt(unix);
  // console.log("unix in int "+temp);

  var dt=new Date(temp);
  // console.log("dt is date"+dt);
  // dt2=dt.format("yyyy-mm-dd HH:MM:ss");
  dt2=dt.format("mm/dd HH:MM:ss");

  var myLatLng = {lat: lat, lng: lon};
  var marker = new google.maps.Marker({
      position: myLatLng,
      map: map,
      // icon: iconBase + 'placemark_circle_highlight.png',//marina.png
      icon: iconBase + img,//marina.png

      title:"【"+bus+"】"+dt2
  });

  var contentString = '<div id="content">'+
        '<div id="siteNotice">'+
        '</div>'+
        // '<h1 id="firstHeading" class="firstHeading">'+"【"+bus+"】"+'</h1>'+
        '<div id="bodyContent">'+
        // '<p><b>'+$scope.unix+'</b>'+
          '<p><b>'+"【"+bus+"】"+dt2+'</b>'+
        '</div>'+
        '</div>';

    var infowindow = new google.maps.InfoWindow({
      content: contentString
    });
    marker.addListener('click', function() {
      infowindow.open(map, marker);
    });

    if (moveCenter==1){
       map.setCenter(marker.getPosition());
    }


}

// No. 35, Duxin Rd, Xitun District
// Taichung City, 407
// 24.179281, 120.600585

$scope.test =function initMap() {
  var map = new google.maps.Map(document.getElementById('map'), {
    zoom: 16,
    center: {lat: 24.179281, lng: 120.600585}
  });

  marker = new google.maps.Marker({
    map: map,
      icon:'img/idea.gif',
    draggable: true,
    animation: google.maps.Animation.DROP,
    position: {lat: 24.179281, lng: 120.600585}
  });
   map.setCenter(marker.getPosition());
  marker.addListener('click', toggleBounce);

  var contentString = '<div id="content">'+
        '<div id="siteNotice">'+
        '</div>'+
        // '<h1 id="firstHeading" class="firstHeading">'+"【"+bus+"】"+'</h1>'+
        '<div id="bodyContent">'+
        // '<p><b>'+$scope.unix+'</b>'+
          '<p><b>twcloudwebapp@outlook.com</b>'+
        '</div>'+
        '</div>';

    var infowindow = new google.maps.InfoWindow({
      content: contentString
    });
    marker.addListener('click', function() {
      infowindow.open(map, marker);
    });




}

function toggleBounce() {
  if (marker.getAnimation() !== null) {
    marker.setAnimation(null);
  } else {
    marker.setAnimation(google.maps.Animation.BOUNCE);
  }
}


  $scope.setAnchor =function (){
var myInitLatLng = {lat: 25.033718, lng: 121.565512};//25.033718,121.565512


var marker = new google.maps.Marker({
    position: myInitLatLng,
    map: map,
    draggable: true,
    animation: google.maps.Animation.DROP,
    icon: iconBase + 'marina.png',//marina.png

});
  marker.addListener('click', toggleBounce);
 map.setCenter(marker.getPosition());
 //
 // marker = new google.maps.Marker({
 //     map: map,
 //     draggable: true,
 //     animation: google.maps.Animation.DROP,
 //     position: {lat: 59.327, lng: 18.067}
 //   });
 //   marker.addListener('click', toggleBounce);
 // }
 //







 // map.panTo(marker.getPosition())
}
function toggleBounce() {
  if (marker.getAnimation() !== null) {
    marker.setAnimation(null);
  } else {
    marker.setAnimation(google.maps.Animation.BOUNCE);
  }
}


    // TO SHOW ALL MARKS
    $scope.busClick =function (selectCar){
       // TODO
      //  var busNum="001-FQ";
      //  var busDate="2016-01-18";
      //  var startStr = busDate ;
      //  var endStr = startStr + " 23:59:59";
      //  console.log("startStr=" + startStr);
      //  console.log("endStr=" + endStr);

       var rul9=urlFirebase+"/"+selectCar;
       console.log("rul9=" + rul9);
       var ref9 = new Firebase(rul9);
       var query=ref9;
      //  var query = ref9.orderByChild("dt").startAt(startStr).endAt(endStr);
      //  var query = ref9.orderByChild("unix");
       var cnt=0;
//25.084425, 121.561544
//25.03315 121.6134
        console.log("TODO center, get it from current or buslist");

        var lastLat;
        var lastLon;
        var myLatLng ;
        query.on("child_added", function (snapshot, prevChildKey) {
           var val=snapshot.val() ;
              myLatLng = {lat: val.lat, lng: val.lon};
        });

        // var center = {lat: lastLat, lng: lastLon};
        map = new google.maps.Map(document.getElementById('map'), {
          center: {lat: $scope.lat,lng:$scope.lon},
          zoom: 13
        });

       query.on("child_added", function (snapshot, prevChildKey) {
          var val=snapshot.val() ;
          makeMarker(val.bus,val.unix,val.lat,val.lon,'placemark_circle_highlight.png',0);
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
