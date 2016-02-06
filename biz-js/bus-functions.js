
function resetRouteBuses(){
  map = new google.maps.Map(document.getElementById('map'), {
      center: initLatLng,
      zoom: 14,
      disableDefaultUI: true //https://developers.google.com/maps/documentation/javascript/controls
  });
  selectRoute();
}

function selectRoute(){
  // alert(mySelect.value+" "+route_name[mySelect.value]);
  console.log(mySelect.value+" "+route_name[mySelect.value]);




      var busCnt = 0;

      document.getElementById("busCnt").innerHTML = busCnt + "輛公車";

      // var obj = JSON.parse(doc); // index.html 傳過來的是String, 要先當成 json obj 好應用

      var route = parseInt(mySelect.value);// routeId 過來時是文本,要轉成 integer


      refBuslist.once("child_added", function (snapshot, prevChildKey) { // 就只有一個doc
          var key = snapshot.key();
          var val = snapshot.val();
          var array = val;
          // console.log(val);
          var toOpen = true;


          var showRouteAlready = false;
          for (var i = 0; i < array.length; i++) {
              var bus = array[i];
              if (bus['route'] == route) {

                  busCnt++;
                  document.getElementById("busCnt").innerHTML = busCnt + "輛公車";

                  // var temp = obj.mapUrl;
                  // var temp2 = temp.split("=");
                  // $scope.majorRoute = parseInt(temp2[1]);


                  var mmm = route_url[mySelect.value].split("=");
                  majorroute =parseInt( mmm[1]);

                  if (!showRouteAlready) {
                      getRouteDots(majorroute);
                      showRouteAlready = true;


                  }


                  var dt = new Date(parseInt(bus.unix));
                  var dt2 = dt.format("yyyy-mm-dd<br><b>HH:MM</b>:ss");
                  var msg = ""
                          // + "<div><h4>"
                          + "<div>"
                          + "<a target='_blank' href='" + route_url[mySelect.value] + "' >"
                          + "<b>【" + route_name[mySelect.value] + "】</b><br>"
                          + route_start[mySelect.value]
                          + "<br>" + route_stop[mySelect.value]
                          + "</a>"
                          + "<br><b>#" + busCnt
                          + "</b>"
                          + "</div>"
                          + dt2
                          + '<h4 style="cursor:crosshair; color:#1A237E" onclick="show30Dots(\'' + bus.bus + '\')">' + bus.bus + '</h4>'
                          + "</div>"
                          ;
                  makeMarkerV2(bus.bus, bus.unix, bus.lat, bus.lon, iconBus, toOpen, true, null, msg);
                  toOpen = false;
                  // $scope.lat=bus.lat;
                  // $scope.lon=bus.lon;
              }
          }
          if (busCnt == 0) {
              showAnchor();
          } else {
              // map.setCenter({lat: $scope.lat, lng: $scope.lon});
          }
      }); // end of once
  }





  var route_name = [];
  var route_start = [];
  var route_stop = [];
//mapUrl
  var route_url = [];


var favorites = [];


function prepareDdlRoute(){
refRoutes.once("child_added", function (snapshot, prevChildKey) { // 就只有一個doc
    var key = snapshot.key();
    var val = snapshot.val();
    var obj = val;



    var byHand = '<select  class="form-control" style="font-size:110%"  id="mySelect" onchange="selectRoute()">'
                +'  <option value="" disabled selected > === 請選擇路線 === </option>';
    var temp = "";

//http://stackoverflow.com/questions/979256/sorting-an-array-of-javascript-objects
function compare(a,b) {
if (a.routeName < b.routeName)
return -1;
else if (a.routeName > b.routeName)
return 1;
else
return 0;
}


    // obj.sort(mycomparator);
    var a1=[];
    for (var key in obj) {
        ttlRouteCnt++;
        // var attrName = key;
        // var attrValue = obj[key];
        //route_name[key] = obj[key].routeName+"   "+obj[key].startStop+"=>"+obj[key].endStop;
        route_name[key] = obj[key].routeName;
        route_start[key] = obj[key].startStop;
        route_stop[key] = obj[key].endStop;
          route_url[key] = obj[key].mapUrl;


        // console.log(key + " " + route_name[key]);
        //
        // byHand += '  <option value="' + key + '">' + route_name[key] + '</option>';
        var oneRoute={route:key,routeName:obj[key].routeName,startStop:obj[key].startStop,endStop:obj[key].endStop};
        // console.log(JSON.stringify(oneRoute));
        // a1[key]=oneRoute;
        favorites.push(oneRoute);
        // ddlRouteObj.push({route:key,routeName:obj[key].routeName,startStop:obj[key].startStop,endStop:obj[key].endStop});
    }

    favorites.sort(compare);
    //  console.log(JSON.stringify(favorites));

  //  console.log("XXXXXXXXXXXXXx");
    for (var key in favorites) {


        var obj = favorites[key];

        // console.log(obj);


        // console.log(key + " " + xyz);
        // var xyz= obj[key].routeName+"   "+obj[key].startStop+"=>"+obj[key].endStop;

        byHand += '  <option value="' + obj.route + '">' +obj.routeName +" " +obj.startStop + "=>"+obj.endStop + '</option>';

    }



    byHand += ' </select>';
    document.getElementById("ddlRoute").innerHTML = byHand;



    document.getElementById("routeCnt").innerHTML ="計有路線數:" +ttlRouteCnt ;
    $("#ddlRoute").show(1000, function () {
        $("#map").show(1000, function () {
            initMap();
        })
    });
});
}
