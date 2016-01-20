//https://developers.google.com/maps/documentation/javascript/infowindows
  // var map;
  function initTeam() {
    // var myInitLatLng = {lat: 25.033718, lng: 121.565512};//25.033718,121.565512

      // var myInitLatLng = {lat: 25.033718, lng: 121.565512};//25.033718,121.565512
      // map = new google.maps.Map(document.getElementById('map'), {
      //   center: myInitLatLng,
      //   zoom: 13
      // });

      marker = new google.maps.Marker({
        map: map,
          icon:'img/idea.gif',
        draggable: true,
        animation: google.maps.Animation.DROP,
        position: {lat: 24.179281, lng: 120.600585}
      });

      marker.addListener('click', toggleBounce);
     map.setCenter(marker.getPosition());

     function toggleBounce() {
       if (marker.getAnimation() !== null) {
         marker.setAnimation(null);
       } else {
         marker.setAnimation(google.maps.Animation.BOUNCE);
       }
     }

     var title="諾得捷思隊 twcloudwebapp@outlook.com";

     var item0='<h3>隊長: 陳美君  創意規畫</h3>';

     var item1='<h3>隊員: 陳炳陵  開發測試</h3>';
     var item2="";

     var contentString = '<div id="content">'+
           '<div id="siteNotice">'+
           '</div>'+
           '<h1 id="firstHeading" class="firstHeading">'+title+'</h1>'+
           '<div id="bodyContent">'+item0+item1+item2+
          //  '<p><b>Uluru</b>, also referred to as <b>Ayers Rock</b>, is a large ' +
          //  'sandstone rock formation in the southern part of the '+
          //  'Northern Territory, central Australia. It lies 335&#160;km (208&#160;mi) '+
          //  'south west of the nearest large town, Alice Springs; 450&#160;km '+
          //  '(280&#160;mi) by road. Kata Tjuta and Uluru are the two major '+
          //  'features of the Uluru - Kata Tjuta National Park. Uluru is '+
          //  'sacred to the Pitjantjatjara and Yankunytjatjara, the '+
          //  'Aboriginal people of the area. It has many springs, waterholes, '+
          //  'rock caves and ancient paintings. Uluru is listed as a World '+
          //  'Heritage Site.</p>'+
          //  '<p>Attribution: Uluru, <a href="https://en.wikipedia.org/w/index.php?title=Uluru&oldid=297882194">'+
          //  'https://en.wikipedia.org/w/index.php?title=Uluru</a> '+
          //  '(last visited June 22, 2009).</p>'+
           '</div>'+
           '</div>';

       var infowindow = new google.maps.InfoWindow({
         content: contentString
       });


       marker.addListener('click', function() {
         infowindow.open(map, marker);
       });
    }
