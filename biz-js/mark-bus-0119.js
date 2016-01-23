// Mark, 2016/1/20 11:19
var iconCircle=iconBase + 'placemark_circle_highlight.png';
var iconBus="http://maps.google.com/mapfiles/kml/shapes/bus.png";
var urlFirebase = "https://bus-0119.firebaseio.com/";
//
var app = angular.module("sampleApp", ["firebase"]);
app.controller("SampleCtrl", function ($scope, $firebaseArray) {
    var ref = new Firebase(urlFirebase);
    // var refBuslist = ref.child('buslist');

    var CAR_CNT=360;
    // var CAR_CNT=1280;
    var refBuslist2 = ref.child('buslist2');

    //這是可以參考的範例
    // $scope.busList = $firebaseArray(refBuslist2.limitToFirst(CAR_CNT));

    $scope.buslist3x = $firebaseArray(ref.child('buslist3x').orderByChild("bus"));

    // NOTE 取一個 bus 出來
    // $scope.busNumList= $firebaseArray(ref.child("buslist3").limitToLast(1));
    //  var ref = new Firebase("https://dinosaur-facts.firebaseio.com/");
    var refBusNumList=ref.child("buslist3x");
    $scope.firstbus="...截入資料中,請稍候";
    var loadingCnt=0;
    //refBusNumList.limitToFirst(1).on("child_added", function(snapshot) {
    // https://www.firebase.com/docs/web/api/query/once.html
    refBusNumList.limitToFirst(1).once("child_added", function(snapshot) {
      //  console.log(snapshot.key()+",,, loadingCnt= "+loadingCnt); // 確保了只有運行一次,
      // console.log(snapshot.val());
      var val=snapshot.val();
      //if (loadingCnt==0){  //這是之前的寫法,先留著
        $scope.firstbus=val.bus;
        $scope.bus=val.bus;
        ddlBusChange(val.bus) ;
        loadingCnt++;
      //}
      //console.log(" val.bus.length "+val.bus.length);
    });

    //ref.child("bus-routes").limitToFirst(1).once("child_added", function(snapshot) {
    $scope.routesStatus="...loading routes";
    // console.log(  $scope.routesStatus);
    //
    // // https://www.firebase.com/docs/web/api/datasnapshot/foreach.html
    // var qry1=ref.child("bus-routes").once("value", function(snapshot) {
    //   var key=snapshot.key();
    //   var val=snapshot.val();
    //   console.log("key==>");
    //   console.log(key);
    //   console.log("val==>");
    //   console.log(val);
    //   var checking=val['10283'];
    //     console.log(  checking);
    //   // var array=val;
    //   // for (var i = 0; i < array.length; i++) {
    //   //   console.log(i+" "+array[i]);
    //   // }
    //
    //
    //   $scope.routesStatus=" routes loaded!";
    //   console.log(  $scope.routesStatus);
    // });
    // $scope.routes= $firebaseArray(qry1);




    // Taipei 101
    //lat: 25.033718, lng: 121.565512
    $scope.lat = 25.033718;
    $scope.lon = 121.565512;
    $scope.bus = "";
    $scope.unix="";
    $scope.route="";
    $scope.routeMsg ="...do nothing yet "

    // 選擇了bus,即顯示,準備定點可以快速在地圖回到中心點
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
            // console.log("**********************bus=" + doc.bus);
            $scope.lat = doc.lat;
            $scope.lon = doc.lon;
            $scope.unix = doc.unix;
            $scope.route = doc.route;
            //var temp=parseInt(unix);
            var dt=new Date(parseInt(doc.unix));
            var dt2=dt.format("mm/dd HH:MM");
            //
            //
            // nested??? YES, IT WORKS!
            // https://bus-0119.firebaseio.com/bus-routes/routes/10142
            var refBusRoutes = ref.child("bus-routes/routes/" + doc.route);
            refBusRoutes.on("child_added", function (snapshot, prevChildKey) {
                var doc2 = snapshot.val();
                // console.log("nested???");
                // console.log(doc2);//【"+bus+"】
                $scope.routeName = doc2.routeName;
                $scope.routeMsg ="<br>車牌號碼：【"+doc.bus+"】"
                              +"<br>路線："+doc2.routeName
                              +"<br>起站："+doc2.startStop
                              +"<br>迄站："+doc2.endStop
                              +"<br>路線圖：<a target='_blank' href='"+doc2.mapUrl+"' >查看</a>'"
                              +"<br>資料時間："+dt2
                              +"<br>"
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
      initMap();
      // var marker = new google.maps.Marker({
      //     position: initLatLng,
      //     map: map,
      //     // draggable: true,
      //     animation: google.maps.Animation.DROP,
      //     icon: iconBase + 'marina.png',//marina.png
      //
      // });
      //   // marker.addListener('click', toggleBounce);
      //  map.setCenter(marker.getPosition());
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

    // TO SHOW ALL MARKS
    $scope.showTracking = function (selectCar,selectTracking) {
      if(selectTracking === undefined){
        selectTracking=30;
      }
      var SHOW_DOT_CNT=1+ parseInt(selectTracking);

      var URL2 = urlFirebase +  $scope.firstbus;
      var REF2 = new Firebase(URL2);
      var query = REF2.endAt().limitToLast(SHOW_DOT_CNT);

        //
//http://stackoverflow.com/questions/25611356/display-posts-in-descending-posted-order
  // console.log("========================================");
        var cnt=0;
        query.on("child_added", function (snapshot, prevChildKey) {
            var val = snapshot.val();

            $scope.bus =val.bus;
            $scope.lat = val.lat;
            $scope.lon = val.lon;
            $scope.unix = val.unix;
            $scope.route = val.route;
            $scope.routeMsg = "";
            //https://bus-0119.firebaseio.com/bus/routes/111520
            var refRoute = ref.child("bus/routes/"+val.route);
          //  var query = ref.orderByChild("timestamp").limitToLast(100);
            // refRoute.once("child_added", function(messageSnapshot) {
            //   // This will only be called for the last 100 messages
            //   var key = messageSnapshot.key();
            //   var val = messageSnapshot.val();
            //   /*
            //   endStop:               "捷運市政府站"
            //    mapUrl:               "http://e-bus.taipei.gov.tw/newmap/Tw/ManualRout..."
            //    routeId:              111520
            //    routeName:               "266"
            //    startStop:               "新北投"
            //
            //   */
            //   console.log(" key="+key);
            //   // console.log(" val="+val);
            //     $scope.routeMsg=" route info:"+val.routeName+" "+val.startStop+" "+val.endStop+" "+val.startStop;
            //     console.log($scope.routeMsg);
            // });


            cnt++;
            console.log ( "cnt = "+cnt);
            var dt=new Date(parseInt(val.unix));
            var  dt2=dt.format("mm/dd HH:MM:ss");


            if ( cnt==1){
              makeMarker(val.bus, val.unix, val.lat, val.lon,iconCircle, true ,false,cnt,"");
            }else if ( cnt>SHOW_DOT_CNT){
                makeMarker(val.bus, val.unix, val.lat, val.lon,null, true ,true,cnt,"");
            }else{
                makeMarker(val.bus, val.unix, val.lat, val.lon,iconCircle, false ,true,cnt,"");
            }



        });
        console.log ( " after query.on  ");
        // makeMarker($scope.bus, $scope.unix, $scope.lat, $scope.lon, null, true,true,null,$scope.routeMsg );//moveLastPostionToCenter();
        // makeMarker($scope.bus, $scope.unix, $scope.lat, $scope.lon, null, true,true,null,$scope.routeMsg );//moveLastPostionToCenter();


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
