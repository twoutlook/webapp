// NOTE:清畫面,重畫路線和車輛

function openMapUrl(url){
  window.open(url,'popUpWindow','height=400,width=600,left=10,top=10');
}


//中間按鈕
function resetRouteBuses(num) {
  console.log("DOING...resetRouteBuses===>"+num);
  selectRouteAndBus(num);

  //DOING
  // watch_bus_array=[];
  return;
  watch_bus_index++;
  if (watch_bus_index == watch_bus_array.length){
    watch_bus_index=1;
  }

  // console.log("resetRouteBuses, watch_bus_array:"+watch_bus_array);
  // console.log("resetRouteBuses, watch_bus_index:"+watch_bus_index);


    map = new google.maps.Map(document.getElementById('map'), {
        center: initLatLng,
        zoom: 14,
        disableDefaultUI: true //https://developers.google.com/maps/documentation/javascript/controls
    });
    selectRouteByAddOne();
}

var mem_majorRouteId=0;
var mem_route_name;
var mem_route_start;
var mem_route_stop;
var save_bus=[];

// NOTE:重畫路線和車輛
function selectRoute() {
    anchorCnt=99;
    initMap();
    watch_bus_array=[];
    watch_bus_index=-1;

    // alert(mySelect.value+" "+route_name[mySelect.value]);
    // console.log(mySelect.value + " " + route_name[mySelect.value]);
    $("#list").hide();

    var busCnt = 0;
    document.getElementById("busCnt").innerHTML = busCnt + "輛公車";
    var route = parseInt(mySelect.value);// routeId 過來時是文本,要轉成 integer

    refBuslist.once("child_added", function (snapshot, prevChildKey) { // 就只有一個doc
        var key = snapshot.key();
        var val = snapshot.val();
        var array = val;
        var toOpen = true;
        var showRouteAlready = false;
        for (var i = 0; i < array.length; i++) {
            var bus = array[i];
            if (bus['route'] == route) {

              save_bus[busCnt]=bus;

                busCnt++;
                document.getElementById("busCnt").innerHTML = busCnt + "輛公車";

                watch_bus_array[busCnt]=bus['bus'] ;
                watch_bus_index=1;

                // NOTE:MAP URL 的ID值,剛好就是 Major Route
                var temp1 = route_url[mySelect.value].split("=");
                var majorRouteId = parseInt(temp1[1]);

mem_majorRouteId=majorRouteId;


                // NOTE:路線上的站牌只要畫一次
                if (!showRouteAlready) {
                    getRouteDots(majorRouteId);
                    showRouteAlready = true;
                }


                var dt = new Date(parseInt(bus.unix));
                var dt2 = dt.format("yyyy-mm-dd<br><b>HH:MM</b>:ss");
                var msg = ""
                        // + "<div><h4>"
                        + "<div>"
                        + '<h4><button style="; border-radius: 6px; background-color:#D9544F; color:white" type="button" onclick="show30Dots(\'' + bus.bus + '\')">' + bus.bus + '</button></h4>'
                        + dt2
                        + '<h4><button style="; border-radius: 6px; background-color:#5BB85D; color:white" type="button" onclick="resetRouteBuses(\'' + busCnt + '\')">' +"第" + (busCnt)+"輛" + '</button></h4>'
                        + '<h4><button style="; border-radius: 6px; background-color:#327DB4; color:white" type="button" onclick="openMapUrl(\'' + route_url[mySelect.value] + '\')">' + route_name[mySelect.value] + '</button></h4>'
                        + "</div>"
                        ;
                // makeMarkerV2(bus.bus, bus.unix, bus.lat, bus.lon, iconBus, toOpen, true, null, msg);
                makeMarkerV3___toFro(bus.bus, bus.unix, bus.lat, bus.lon, iconBus, toOpen, true, null, msg);
                toOpen = false;
            }
        }


        // console.log(watch_bus_array);
        // console.log(watch_bus_index);

        // NOTE:當路線沒有車時,顯示地標
        if (busCnt == 0) {
            showAnchor();
        } else {
            // map.setCenter({lat: $scope.lat, lng: $scope.lon});
        }
    }); // end of once
}

// NOTE:重畫路線和車輛
function selectRouteAndBus(num) {
    anchorCnt=99;
    initMap();
    watch_bus_array=[];
    watch_bus_index=-1;

    // alert(mySelect.value+" "+route_name[mySelect.value]);
    console.log("selectRouteAndBus()");
    $("#list").hide();

    var busCnt = 0;
    document.getElementById("busCnt").innerHTML = busCnt + "輛公車";
    var route = parseInt(mySelect.value);// routeId 過來時是文本,要轉成 integer

    refBuslist.once("child_added", function (snapshot, prevChildKey) { // 就只有一個doc
        var key = snapshot.key();
        var val = snapshot.val();
        var array = val;
        var toOpen = true;
        var showRouteAlready = false;
        for (var i = 0; i < array.length; i++) {
            var bus = array[i];
            if (bus['route'] == route) {

              save_bus[busCnt]=bus;

                busCnt++; //指定切換的車輛數
                document.getElementById("busCnt").innerHTML = busCnt + "輛公車";

                watch_bus_array[busCnt]=bus['bus'] ;
                watch_bus_index=1;

                // NOTE:MAP URL 的ID值,剛好就是 Major Route
                var temp1 = route_url[mySelect.value].split("=");
                var majorRouteId = parseInt(temp1[1]);

mem_majorRouteId=majorRouteId;


                // NOTE:路線上的站牌只要畫一次
                if (!showRouteAlready) {
                    getRouteDots(majorRouteId);
                    showRouteAlready = true;
                }


                var dt = new Date(parseInt(bus.unix));
                var dt2 = dt.format("yyyy-mm-dd<br><b>HH:MM</b>:ss");
                var msg = ""
                        // + "<div><h4>"
                        + "<div>"
                        + '<h4><button style="; border-radius: 6px; background-color:#D9544F; color:white" type="button" onclick="show30Dots(\'' + bus.bus + '\')">' + bus.bus + '</button></h4>'
                        + dt2
                        + '<h4><button style="; border-radius: 6px; background-color:#5BB85D; color:white" type="button" onclick="resetRouteBuses(\'' +(busCnt)+ '\')">' +"第" + (busCnt)+"輛" + '</button></h4>'
                        + '<h4><button style="; border-radius: 6px; background-color:#327DB4; color:white" type="button" onclick="openMapUrl(\'' + route_url[mySelect.value] + '\')">' + route_name[mySelect.value] + '</button></h4>'
                        + "</div>"
                        ;
                // makeMarkerV2(bus.bus, bus.unix, bus.lat, bus.lon, iconBus, toOpen, true, null, msg);
                toOpen = false;

                if (busCnt==num) {

                 toOpen = true;
                }
                makeMarkerV3___toFro(bus.bus, bus.unix, bus.lat, bus.lon, iconBus, toOpen, true, null, msg);
            }
        }


        // console.log(watch_bus_array);
        // console.log(watch_bus_index);

        // NOTE:當路線沒有車時,顯示地標
        if (busCnt == 0) {
            showAnchor();
        } else {
            // map.setCenter({lat: $scope.lat, lng: $scope.lon});
        }
    }); // end of once
}

function selectRouteByAddOne() {



    // alert(mySelect.value+" "+route_name[mySelect.value]);
     console.log("DOING...selectRouteByAddOne,,,, -1???");
    $("#list").hide();

    if( watch_bus_array.length==0){
      return;
    }



    // NOTE:路線上的站牌只要畫一次
        getRouteDots(mem_majorRouteId);
        // console.log(save_bus);


        var toOpen=false;
        for (var i = 0; i < save_bus.length; i++) {
            var bus = save_bus[i];
            // console.log("DOING "+bus);

            toOpen=false;
            if ((1+i)==watch_bus_index){
              toOpen=true;
            }
            // var mem_route_name;
            // var mem_route_start;
            // var mem_route_stop;
                var dt = new Date(parseInt(bus.unix));
                var dt2 = dt.format("yyyy-mm-dd<br><b>HH:MM</b>:ss");

                var msg = ""
                        // + "<div><h4>"
                        + "<div>"
                        + '<h4><button style="; border-radius: 6px; background-color:#D9544F; color:white" type="button" onclick="show30Dots(\'' + bus.bus + '\')">' + bus.bus + '</button></h4>'
                        + dt2
                        + '<h4><button style="; border-radius: 6px; background-color:#5BB85D; color:white" type="button" onclick="resetRouteBuses()">' +"第" + (1+i)+"輛" + '</button></h4>'
                        + '<h4><button style="; border-radius: 6px; background-color:#327DB4; color:white" type="button" onclick="openMapUrl(\'' + route_url[mySelect.value] + '\')">' + route_name[mySelect.value] + '</button></h4>'
                        + "</div>"
                        ;






                makeMarkerV2(bus.bus, bus.unix, bus.lat, bus.lon, iconBus, toOpen, true, null, msg);
                // toOpen = false;
                document.getElementById("busCnt").innerHTML = watch_bus_array.length-1 + "輛第"+watch_bus_index+"輛";

        }


        // console.log(watch_bus_array);
        // console.log(watch_bus_index);

        // NOTE:當路線沒有車時,顯示地標
        if (busCnt == 0) {
            showAnchor();
        } else {
            // map.setCenter({lat: $scope.lat, lng: $scope.lon});
        }

}




var route_name = [];
var route_start = [];
var route_stop = [];
var route_url = []; //mapUrl


function prepareDdlRoute() {
    var routeWithStop = [];

    for (var key2 in routeStops) {
      routeWithStop[key2]=true;
      // console.log(key2);
      // console.log(routeStops[key2]);

    }
  // console.log(routeWithStop);


    var favorites = []; // NOTE: 只有這內部使用
    refRoutes.once("child_added", function (snapshot, prevChildKey) { // 就只有一個doc
        var key = snapshot.key();
        var val = snapshot.val();
        var obj = val;
        var byHand = '<select  class="form-control" style="font-size:110%"  id="mySelect" onchange="selectRoute()">'
                + '  <option value="" disabled selected > === 請選擇路線 === </option>';
        var temp = "";
        var ttlRouteCnt = 0;
        var a1 = [];
        for (var key in obj) {

            route_name[key] = obj[key].routeName;
            route_start[key] = obj[key].startStop;
            route_stop[key] = obj[key].endStop;
            route_url[key] = obj[key].mapUrl;
            var oneRoute = {route: key, routeName: obj[key].routeName, startStop: obj[key].startStop, endStop: obj[key].endStop};

            // console.log(oneRoute);
            // console.log(routeStops[""+key]);
            var temp1 = route_url[key].split("=");
            var majorRouteId = parseInt(temp1[1]);
// routeStops
            if (routeWithStop[majorRouteId]){
                ttlRouteCnt++;
                favorites.push(oneRoute);
            }

        }

        favorites.sort(compare);
        for (var key in favorites) {
            var obj = favorites[key];
            byHand += '  <option value="' + obj.route + '">' + obj.routeName + " " + obj.startStop + "=>" + obj.endStop + '</option>';
        }
        byHand += ' </select>';
        document.getElementById("ddlRoute").innerHTML = byHand;
        document.getElementById("routeCnt").innerHTML = "共載入路線數" + ttlRouteCnt;

        $("#ddlRoute").show(1000, function () {
            $("#map").show(1000, function () {
                initMap();
                document.getElementById("routeCnt").innerHTML = "路線" ;
            })
        });
    });
}
