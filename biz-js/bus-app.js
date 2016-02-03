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
    $scope.routeCnt = 0;
    $scope.activeRoute = 0;

    var busArray = [];

    var allRoutes = {};

    var refRoutes = ref.child("routesv5/");
    var refBuslist = ref.child("buslistv6/");


    refRoutes.once("child_added", function (snapshot, prevChildKey) { // 就只有一個doc
        var key = snapshot.key();
        var val = snapshot.val();
        var obj = val;
        var route_name=[];


        for(var key in obj){
          $scope.routeCnt++;
            // var attrName = key;
            // var attrValue = obj[key];
            route_name[key]=obj[key].routeName;

            // console.log(key+" "+obj[key].routeName);
        }
        document.getElementById("routeCnt").innerHTML =$scope.routeCnt+"個路線";
    });






    function showRouteBusList(){
      console.log("DOING... showRouteBusList");
      refRoutes.once("child_added", function (snapshot, prevChildKey) { // 就只有一個doc
          var key = snapshot.key();
          var val = snapshot.val();
          var obj = val;
          var route_name=[];
          var map_url=[];
          for(var key in obj){
              var attrName = key;
              var attrValue = obj[key];
              route_name[key]=obj[key].routeName;
              map_url[key]=obj[key].mapUrl;
              // console.log(key+" "+obj[key].routeName);
          }
          // console.log(key);
          // console.log(val);
          // console.log(val['810'].routeName);
          // for (var i = 0; i < array.length; i++) {
          //     var route = array[i];
          //     console.log(i+" "+ JSON.stringify(route));
          // }
          // function getRouteName(route){
          //     return val[route].routeName
          // }
          // console.log (getRouteName(810));

          var obj={};
          refBuslist.once("child_added", function (snapshot, prevChildKey) { // 就只有一個doc
            $scope.routeCnt ++;

              var key = snapshot.key();
              var val = snapshot.val();
              var array = val;
              // console.log(val);
              var route_bus=[];
              var routeName_bus=[];

              var toOpen = true;
              for (var i = 0; i < array.length; i++) {
                  var bus = array[i];

                  // console.log(bus['route']);
                  var routeId=parseInt(bus['route']);
                  // var routeName=getRouteName(bus['routeId']);
                  // console.log(routeId+ " "+routeName);


                  // console.log("route "+bus['route']);
                  // console.log("bus "+bus['bus']);
                  // route_bus[bus['route']]+=bus['bus']+" ";
                  if (  obj[bus['route']]===undefined){
                      obj[bus['route']]=bus['bus']+" ";
                  }else{
                      obj[bus['route']]+=bus['bus']+" ";
                  }

              }

              // console.log(JSON.stringify(obj));
              var str="只列出現在資料有公車的路線<table class='flat-table'>";
              // str+=" <tr><th>序號</th><th>路線編號</th><th>路線名稱</th><th>車輛數</th><th>車牌號碼</th></tr>";
  // str+= "<tr><th colspan='4'>現有公車的路線</th></tr>";
              str+=" <tr><th>序號</th><th>路線編號</th><th>車輛數</th><th align='left'>路線名稱</th></tr>";
            var cnt=0;
              for(var key in obj){
                  var attrName = key;
                  var attrValue = obj[key];
                  // console.log(key+" 【"+route_name[key]+"】 "+obj[key]);
                  // console.log(key+" ");
                  // str+=" <br>"+key+"【"+route_name[key]+"】 "+obj[key];
                  if (route_name[key]===undefined){
                    // TODO WHY?
                  }else{
                      cnt++;
                      var temp=obj[key].split(" ");
                      // str+=" <tr><th>"+cnt+"</th><td>"+key+"</td><td>【"+route_name[key]+"】</td><td> "+temp.length+"</td><td>"+obj[key]+"</td></tr>";
                      str+=" <tr><th>"+cnt+"</th><td>"+key+"</td><td align='center'>"+temp.length
                      +"</td><td> "
                      // +"<button>【"+route_name[key]+"】</button></td></tr>";
                        +"【"+route_name[key]+"】</td>"
                        +"<td>"+map_url[key]+"</td>"
                        +"</tr>";
                  }


              }
              str+="</table>";

              // NOTE working, 2/1 02:23
              document.getElementById("list").innerHTML =str;


          }); // en



      });


    }




    function showRouteBusListV2(){
      console.log("DOING... showRouteBusListV2");
      refRoutes.once("child_added", function (snapshot, prevChildKey) { // 就只有一個doc
          var key = snapshot.key();
          var val = snapshot.val();
          var obj = val;
          var route_name=[];
          // for(var key in obj){
          //     var attrName = key;
          //     var attrValue = obj[key];
          //     route_name[key]=obj[key].routeName;
          //     // console.log(key+" "+obj[key].routeName);
          // }
          //

          var map_url=[];
          for(var key in obj){
              var attrName = key;
              var attrValue = obj[key];
              route_name[key]=obj[key].routeName;
              map_url[key]=obj[key].mapUrl;
              // console.log(key+" "+obj[key].routeName);
          }
          // console.log(key);
          // console.log(val);
          // console.log(val['810'].routeName);
          // for (var i = 0; i < array.length; i++) {
          //     var route = array[i];
          //     console.log(i+" "+ JSON.stringify(route));
          // }
          // function getRouteName(route){
          //     return val[route].routeName
          // }
          // console.log (getRouteName(810));

          var obj={};
          refBuslist.once("child_added", function (snapshot, prevChildKey) { // 就只有一個doc
            $scope.routeCnt ++;

              var key = snapshot.key();
              var val = snapshot.val();
              var array = val;
              // console.log(val);
              var route_bus=[];
              var routeName_bus=[];

              var toOpen = true;
              for (var i = 0; i < array.length; i++) {
                  var bus = array[i];

                  // console.log(bus['route']);
                  var routeId=parseInt(bus['route']);
                  // var routeName=getRouteName(bus['routeId']);
                  // console.log(routeId+ " "+routeName);


                  // console.log("route "+bus['route']);
                  // console.log("bus "+bus['bus']);
                  // route_bus[bus['route']]+=bus['bus']+" ";
                  if (  obj[bus['route']]===undefined){
                      obj[bus['route']]=bus['bus']+" ";
                  }else{
                      obj[bus['route']]+=bus['bus']+" ";
                  }

              }

              // console.log(JSON.stringify(obj));
              var str="只列出現在資料有公車的路線<table class='flat-table'>";
              str+=" <tr><th>序號</th><th>路線編號</th><th>路線名稱</th><th>車輛數</th><th>車牌號碼</th></tr>";
    // str+= "<tr><th colspan='4'>現有公車的路線</th></tr>";
              // str+=" <tr><th>序號</th><th>路線編號</th><th>車輛數</th><th align='left'>路線名稱</th></tr>";
            var cnt=0;
              for(var key in obj){
                  var attrName = key;
                  var attrValue = obj[key];
                  // console.log(key+" 【"+route_name[key]+"】 "+obj[key]);
                  // console.log(key+" ");
                  // str+=" <br>"+key+"【"+route_name[key]+"】 "+obj[key];
                  if (route_name[key]===undefined){
                    // TODO WHY?
                  }else{
                      cnt++;
                      var temp=obj[key].split(" ");
                      str+=" <tr><th>xxx"+cnt+"</th><td>"+key+"  "+"</td>"
                      +"<td><a target='_blank' href='"+ map_url[key]+"'>"+  "【"+route_name[key]+"】</a></td>"+
                      "<td> "+temp.length+"</td><td>"+obj[key]+"</td></tr>";
                      // str+=" <tr><th>"+cnt+"</th><td>"+key+"</td><td align='center'>"+temp.length
                      // +"</td><td> "
                      // // +"<button>【"+route_name[key]+"】</button></td></tr>";
                      //   +"【"+route_name[key]+"】</td></tr>";
                  }


              }
              str+="</table>";

              // NOTE working, 2/1 02:23
              document.getElementById("list").innerHTML =str;


          }); // en



      });


    }
    $scope.showRouteBusList = function () {
      // showRouteBusList();
      showRouteBusListV2();

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

        // showAnchor();


        var obj = JSON.parse(doc); // index.html 傳過來的是String, 要先當成 json obj 好應用
        var route = parseInt(obj.routeId);// routeId 過來時是文本,要轉成 integer

        refBuslist.once("child_added", function (snapshot, prevChildKey) { // 就只有一個doc
            var key = snapshot.key();
            var val = snapshot.val();
            var array = val;
            // console.log(val);
            var toOpen = true;
            var busCntNumber=0;
            for (var i = 0; i < array.length; i++) {
                var bus = array[i];
                if (bus['route'] == obj.routeId) {
                    busCntNumber++;
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
                            // + "<br>|"
                            + "<br>" + obj.endStop
                            + "</a>"
                            +"<br><b>#" + busCntNumber
                            + "</b></div>"
                            + "【" + bus.bus + "】"
                            + "<br>" + dt2
                            + "</div>"
                            ;

                    // console.log("i=" + i);
                    makeMarkerV2(bus.bus, bus.unix, bus.lat, bus.lon, iconBus, toOpen, true, null, msg);
//function makeMarkerV2            (bus     ,unix,     lat,     lon,     icon ,toOpenNow,toMoveCenterNow,cnt,msg){

                      $scope.lat=bus.lat;
                      $scope.lon=bus.lon;


                    // toOpen=false;

                }
            }
            if ($scope.busCnt==0){
                showAnchor();
            }else{
                map.setCenter({lat: $scope.lat, lng: $scope.lon});
            }

        }); // end of once
    }


    function showAnchor(){
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

    $scope.showAnchor = function () {
      showAnchor();
    }
        //  initMap();
        // initLatLng



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
