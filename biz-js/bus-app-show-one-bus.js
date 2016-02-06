var ref = new Firebase(urlFirebase);

// var ROUTE_ID = params.route; // NOT TO CHANGE IN THIS PAGE
// var MAJOR_ROUTE = params.majorroute; // NOT TO CHANGE IN THIS PAGE
// var ROUTE_NAME = params.routename; // NOT TO CHANGE IN THIS PAGE
// var ROUTE_START = params.routestart; // NOT TO CHANGE IN THIS PAGE
// var ROUTE_END = params.routeend; // NOT TO CHANGE IN THIS PAGE

function showBusOneDot(busNum,x,img,toOpen,toCenter,showRoute){
  ref.child('buslistv9-doc' + x).once("child_added", function (snapshot, prevChildKey) {
      var key = snapshot.key();
      var val = snapshot.val();
      var array = val;

      for (var i = 0; i < array.length; i++) {
          var bus = array[i];


          // if (bus['route'] == route) {
              if (bus['bus'] == busNum) {

              var dt = new Date(parseInt(bus.unix));
              var dt2 = dt.format("yyyy-mm-dd<br><b>HH:MM</b>:ss");



              var msg = ""

                      + "<div>"
                      // + "</b></div>"
                      // + "【" + bus.bus + "】"
                      // + "<br>"
                      + dt2
                      + "</div>"
                      ;
              if (showRoute){

              }

                      // makeMarkerV2(bus.bus, bus.unix, bus.lat, bus.lon, "img/red2.png", false, true, null, msg);
                      makeMarkerV2(bus.bus, bus.unix, bus.lat, bus.lon, img, toOpen, toCenter, null, msg);
                  }
      }

  }); // end of once

}


function showBusTrackingX(busNum, x) {
    //https://bus-0119.firebaseio.com/buslistv8-docnum
    ref.child('buslistv9-docnum').once("child_added", function (snapshot, prevChildKey) {
        var num = parseInt(snapshot.val());
        console.log("x= " + x);
        if (num == x) {
            // showBusOneDot(busNum,x,"img/bus.png",true,true,true);
        }else{
          if ((x==2)||(x==4)||(x==6)||(x==12)||(x==14)||(x==16)||(x==22)||(x==24)||(x==26)){
            showBusOneDot(busNum,x,"img/red2.png",false,true,false); // DOING move center
        }else{
            showBusOneDot(busNum,x,"img/red2.png",false,false,false);
        }
        }
    });
}


function show30Dots(busNum) {
  for (var i=1;i<=30;i++){
      showBusTrackingX(busNum, i);
  }
}
