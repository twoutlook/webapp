
var app = angular.module("sampleApp", ["firebase"]);
app.controller("SampleCtrl", function ($scope, $firebaseArray) {
    $scope.lat = 25.033718;
    $scope.lon = 121.565512;

    // NOTE for bus dropdown list
    // TODO TODAY
    $scope.routes = $firebaseArray(ref.child('routesv5/routes').orderByChild("routeName"));

//ddlRouteChange
    $scope.busCnt = 0;
    $scope.routeCnt = 0;
    $scope.activeRoute = 0;

    var busArray = [];
    var allRoutes = {};

    // var refRoutes = ref.child("routesv5/");
    // var refBuslist = ref.child("buslistv6/");

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
            console.log(key+" "+obj[key].routeName);
        }
        document.getElementById("routeCnt").innerHTML =$scope.routeCnt+"個路線";
        $("#ddlRoute").show(1000,function(){
          $("#map").show(1000,function(){
            initMap();
          })
        });
    });

    // function showRouteBusListV2(){
    //   console.log("DOING... showRouteBusListV2");
    //   refRoutes.once("child_added", function (snapshot, prevChildKey) { // 就只有一個doc
    //       var key = snapshot.key();
    //       var val = snapshot.val();
    //       var obj = val;
    //       var route_name=[];
    //
    //       var map_url=[];
    //       for(var key in obj){
    //           var attrName = key;
    //           var attrValue = obj[key];
    //           route_name[key]=obj[key].routeName;
    //           map_url[key]=obj[key].mapUrl;
    //           // console.log(key+" "+obj[key].routeName);
    //       }
    //       var obj={};
    //       refBuslist.once("child_added", function (snapshot, prevChildKey) { // 就只有一個doc
    //         $scope.routeCnt ++;
    //
    //           var key = snapshot.key();
    //           var val = snapshot.val();
    //           var array = val;
    //           // console.log(val);
    //           var route_bus=[];
    //           var routeName_bus=[];
    //
    //           var toOpen = true;
    //           for (var i = 0; i < array.length; i++) {
    //               var bus = array[i];
    //               var routeId=parseInt(bus['route']);
    //               if (  obj[bus['route']]===undefined){
    //                   obj[bus['route']]=bus['bus']+" "; // FOR THE VERY FIRST TIME
    //               }else{
    //                   obj[bus['route']]+=bus['bus']+" ";
    //               }
    //           }
    //
    //           // console.log(JSON.stringify(obj));
    //           var str="備註: 只列出現在資料有公車的路線<table class='flat-table'>"
    //                   +" <tr><th>序號</th><th>路線編號</th><th>路線名稱</th><th>車輛數</th><th>車牌號碼</th></tr>";
    //           var cnt=0;
    //           for(var key in obj){
    //               if (route_name[key]===undefined){
    //                 // TODO WHY?
    //               }else{
    //                   cnt++;
    //                   var temp=obj[key].split(" ");
    //                   str+=" <tr><th>"+cnt+"</th><td>"+key+"  "+"</td>"
    //                   +"<td><a target='_blank' href='"+ map_url[key]+"'>"+  "【"+route_name[key]+"】</a></td>"+
    //                   "<td> "+temp.length+"</td><td>"+obj[key]+"</td></tr>";
    //               }
    //           }
    //           str+="</table>";
    //           // NOTE working, 2/1 02:23
    //           document.getElementById("list").innerHTML =str;
    //       }); // END OF refBuslist.once
    //   }); // END OF refRoutes.once
    // } //

    $scope.showRouteBusList = function () {
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
    $scope.majorRoute=-1;
    function ddlRouteChange(doc) {
        $scope.busCnt = 0;
        var myDiv = document.getElementById("busCnt");
        myDiv.innerHTML =$scope.busCnt+"輛公車";
        var obj = JSON.parse(doc); // index.html 傳過來的是String, 要先當成 json obj 好應用
        var route = parseInt(obj.routeId);// routeId 過來時是文本,要轉成 integer
        refBuslist.once("child_added", function (snapshot, prevChildKey) { // 就只有一個doc
            var key = snapshot.key();
            var val = snapshot.val();
            var array = val;
            // console.log(val);
            var toOpen = true;
            var busCntNumber=0;

            var showRouteAlready=false;
            for (var i = 0; i < array.length; i++) {
                var bus = array[i];
                if (bus['route'] == obj.routeId) {
                    busCntNumber++;
                    $scope.busCnt++;
                    var myDiv = document.getElementById("busCnt");
                    myDiv.innerHTML =$scope.busCnt+"輛公車";

                    var temp=obj.mapUrl;
                    var temp2=temp.split("=");
                    $scope.majorRoute= parseInt(temp2[1]);

  if (!showRouteAlready){
    getRouteDots($scope.majorRoute);
showRouteAlready=true;


  }

var mmm=obj.mapUrl.split("=");
majorroute=mmm[1];
                    var dt = new Date(parseInt(bus.unix));
                    var dt2 = dt.format("yyyy-mm-dd<br><b>HH:MM</b>:ss");
                    var msg = ""
                    // + "<div><h4>"
                    + "<div>"
                    + "<a target='_blank' href='" + obj.mapUrl + "' >"
                            + "<b>【" + obj.routeName + "】</b><br>"
                            + obj.startStop
                            + "<br>" + obj.endStop
                            + "</a>"
                            +"<br><b>#" + busCntNumber
                            + "</b>"
                            +"</div>"
                            + dt2
                            + '<h4 style="cursor:crosshair; color:#1A237E" onclick="show30Dots(\''+bus.bus+'\')">'+bus.bus+'</h4>'
                            + "</div>"
                            ;
                    makeMarkerV2(bus.bus, bus.unix, bus.lat, bus.lon, iconBus, toOpen, true, null, msg);
                    toOpen=false;
                      // $scope.lat=bus.lat;
                      // $scope.lon=bus.lon;
                }
            }
            if ($scope.busCnt==0){
                showAnchor();
            }else{
                map.setCenter({lat: $scope.lat, lng: $scope.lon});
            }
        }); // end of once
    }


});
