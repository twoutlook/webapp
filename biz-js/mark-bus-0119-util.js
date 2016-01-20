
function makeMarker(bus,unix,lat,lon,icon,toOpenNow,toMoveCenterNow){//1453193870000
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
      title:"【"+bus+"】"+dt2
  });

  var contentString = '<div id="content">'+
        '<div id="siteNotice">'+
        '</div>'+
        // '<h1 id="firstHeading" class="firstHeading">'+"【"+bus+"】"+'</h1>'+
        '<div id="bodyContent">'+
        // '<p><b>'+$scope.unix+'</b>'+
          '<p><b>'+"【"+bus+"】<BR>"+dt2+'</b>'+
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
       map.setCenter(marker.getPosition());
    }
}
