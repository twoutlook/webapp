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

  dt2=dt.format("mm/dd HH:MM");

  var myLatLng = {lat: lat, lng: lon};


  var marker = new google.maps.Marker({
      position: myLatLng,
      map: map,
      // icon: iconBase + 'placemark_circle_highlight.png',//marina.png
      icon: icon,//marina.png

      animation: google.maps.Animation.DROP,
      title:"【&nbsp;"+bus+"&nbsp;】#"+cnt+" "+dt2
  });

  var cntStr="";
  if (cnt!=null){
    cntStr="#"+cnt;
  }

// bus show more info, tracking keep it simple



  var contentString = '<div id="content">'+
        '<div id="siteNotice">'+
        '</div>'+
        // '<h1 id="firstHeading" class="firstHeading">'+"【"+bus+"】"+'</h1>'+
        '<div id="bodyContent">'+
        // '<p><b>'+$scope.unix+'</b>'+
          '<p><b>'+"【"+bus+"】"+cntStr+"<BR>"+dt2+'</b>'+msg+
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


function makeMarkerV2(bus,unix,lat,lon,icon,toOpenNow,toMoveCenterNow,cnt,msg,routeName){//1453193870000
                              //1453194522000
                              console.log("cnt "+cnt);
                              console.log("msg "+msg);

  // console.log("unix "+icon);
  var temp=parseInt(unix);
  // console.log("unix in int "+temp);

  var dt=new Date(temp);
  // console.log("dt is date"+dt);
  // dt2=dt.format("yyyy-mm-dd HH:MM:ss");
  // dt2=dt.format("mm/dd HH:MM:ss");

  dt2=dt.format("mm/dd HH:MM");

  var myLatLng = {lat: lat, lng: lon};


  var marker = new google.maps.Marker({
      position: myLatLng,
      map: map,
      // icon: iconBase + 'placemark_circle_highlight.png',//marina.png
      icon: icon,//marina.png

      animation: google.maps.Animation.DROP,
      title:msg
  });

  var cntStr="";
  if (cnt!=null){
    cntStr="#"+cnt;
  }

// bus show more info, tracking keep it simple



  var contentString = '<div id="content">'+
        '<div id="siteNotice">'+
        '</div>'+
        '<h1 id="firstHeading" class="firstHeading">'+" <u> "+routeName+" </u> "+'</h1>'+
        '<div id="bodyContent">'+
        // '<p><b>'+$scope.unix+'</b>'+
        // '<p><b>'+"【"+bus+"】"+cntStr+"<BR>"+dt2+'</b>'+msg+
        '<p><b>'+msg+
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
