function makeMarker(bus,unix,lat,lon,icon,toOpenNow,toMoveCenterNow,cnt,msg){//1453193870000
                              //1453194522000
  // console.log("unix "+unix);
  // console.log("unix "+icon);
  var temp=parseInt(unix);
  // console.log("unix in int "+temp);

  var dt=new Date(temp);
  // console.log("dt is date"+dt);
  // dt2=dt.format("yyyy-mm-dd HH:MM:ss");
  // dt2=dt.format("mm/dd HH:MM:ss");

  // dt2=dt.format("mm/dd HH:MM");
  dt2=dt.format("yyyy-mm-dd<br><b>HH:MM</b>:ss");
  dt2NoHtml=dt.format("yyyy-mm-dd HH:MM:ss");

  //

  var myLatLng = {lat: lat, lng: lon};


  var marker = new google.maps.Marker({
      position: myLatLng,
      map: map,
      // icon: iconBase + 'placemark_circle_highlight.png',//marina.png
      icon: icon,//marina.png

      animation: google.maps.Animation.DROP,
      title:"【"+bus+"】#"+cnt+" "+dt2NoHtml
  });

  var cntStr="";
  if (cnt!=null){
    cntStr="#"+cnt;
  }

// bus show more info, tracking keep it simple



  var contentString = '<div id="content"  class="firstHeading">'+
        // '<div id="siteNotice">'+
        // '</div>'+
        // '<h1 id="firstHeading" class="firstHeading">'+"【"+bus+"】"+'</h1>'+
        '<div id="bodyContent">'+
        // '<p><b>'+$scope.unix+'</b>'+
          '<p><b>'+"【"+bus+"】"+cntStr+"</b><BR>"+dt2+
        '</div>'+
        '</div>';

    var infowindow = new google.maps.InfoWindow({
      content: contentString
    });

    if (toOpenNow){
      infowindow.open(map, marker);
    }

    marker.addListener('click', function() {
      infowindow.open(map, marker);
    });

    if (toMoveCenterNow){
      //  map.setCenter(marker.getPosition());//myLatLng
        map.setCenter(myLatLng);//myLatLng
    }
}


function makeMarkerV2(bus,unix,lat,lon,icon,toOpenNow,toMoveCenterNow,cnt,msg,routeName){
  // var temp=parseInt(unix);
  // var dt=new Date(temp);
  // dt2=dt.format("mm/dd HH:MM");

  var myLatLng = {lat: lat, lng: lon};

  var marker = new google.maps.Marker({
      position: myLatLng,
      map: map,
      icon: icon,//it can be null
      animation: google.maps.Animation.DROP,
      // title:msg // html tag is bad here
  });

  var contentString = '<div id="content" style="background-color:#f9f9f9"> '+
        '<div id="siteNotice">'+
        '</div>'+
        '<h1 id="firstHeading" class="firstHeading">'+" <u> "+routeName+" </u> "+'</h1>'+
        '<div id="bodyContent" class="firstHeading">'+
        // '<p><b>'+$scope.unix+'</b>'+
        // '<p><b>'+"【"+bus+"】"+cntStr+"<BR>"+dt2+'</b>'+msg+
        '<p>'+msg+
      '</div>'+
        '</div>';

    var infowindow = new google.maps.InfoWindow({
      content: contentString
    });

    if (toOpenNow){
      infowindow.open(map, marker);
    }

    marker.addListener('click', function() {
      infowindow.open(map, marker);
    });

    if (toMoveCenterNow){
          map.setCenter(myLatLng);//myLatLng
    }
}
