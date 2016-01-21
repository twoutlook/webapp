//https://developers.google.com/maps/documentation/javascript/infowindows
  // var map;
  // var iconBase = 'https://maps.google.com/mapfiles/kml/shapes/';  // if wrong here, no map shows
  // var initLatLng={lat: 25.033718, lng: 121.565512};
  //
  //
  // function initMap() {
  //
  //     function toggleBounce() {
  //       if (marker.getAnimation() !== null) {
  //         marker.setAnimation(null);
  //       } else {
  //         marker.setAnimation(google.maps.Animation.BOUNCE);
  //       }
  //     }
  //   // var myInitLatLng = {lat: 25.033718, lng: 121.565512};//25.033718,121.565512
  //
  //   //  var myInitLatLng = {lat: 25.033718, lng: 121.565512};//25.033718,121.565512
  //     map = new google.maps.Map(document.getElementById('map'), {
  //       center: initLatLng,
  //       zoom: 14
  //     });
  //
  //   var marker = new google.maps.Marker({
  //       position: initLatLng,
  //       map: map,
  //       // draggable: true,
  //       animation: google.maps.Animation.DROP,
  //       icon: iconBase + 'marina.png',//marina.png
  //
  //   });
  //     marker.addListener('click', toggleBounce);
  //    map.setCenter(marker.getPosition());
  //
  //
  //
  //    var title="臺北市政府全新「雲端即時開放資料服務」 Taipei OMG (Open, Mobility, Green) 綠色交通應用開發大賽";
  //
  //    var item0='<h3><a  target="_blank" href="https://taipeiomg.bhuntr.com/">';
  //    item0+='1. 開發大賽官網</a> </h3>';
  //
  //    var item1='<h3><a  target="_blank" href="http://data.taipei/">';
  //    item1+='2. Data.Taipei臺北市政府資料開放平台</a> </h3>';
  //
  //    var item2='<h3><a  target="_blank" href="http://transportation-data.taipei">';
  //    item2+='3. 交通即時資料開放資料專區</a></h3> ';
  //    var item3='<h3><a  target="_blank" href="http://data.taipei/opendata/datalist/datasetMeta?oid=c84f781f-02e7-45a4-84c2-0fc690749f66">';
  //    item3+='4. 臺北市公共運輸處 定時車機資訊</a></h3> ';
  //    var item4='<h3><a  target="_blank" href="http://data.taipei/bus/BUSDATA">';
  //    item4+='5. 本作品原始資料即時下載</a></h3> ';
  //
  //
  //    var contentString = '<div id="content">'+
  //          '<div id="siteNotice">'+
  //          '</div>'+
  //         //  '<h1 id="firstHeading" class="firstHeading">'+title+'</h1>'+
  //          '<div id="bodyContent">'+item0+item1+item2+item3+item4+
  //                '</div>'+
  //          '</div>';
  //
  //      var infowindow = new google.maps.InfoWindow({
  //        content: contentString
  //      });
  //
  //
  //      marker.addListener('click', function() {
  //        infowindow.open(map, marker);
  //      });
  //   }
