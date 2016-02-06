            //
            // var map;
            // var anchorCnt = 0;
            // var iconBase = 'https://maps.google.com/mapfiles/kml/shapes/';  // if wrong here, no map shows
            // // var initLatLng={lat: 25.033718, lng: 121.565512};
            // var initLatLng = {lat: 25.033718, lng: 121.565512};
            //
            function getItemHtml(src1, src2, src3) {
                return '<h5>' + src1 + '<a  target="_blank" href="' + src2 + '">' + src3 + '</a> </h5>';
            }

            function initMap() {

                function toggleBounce() {
                    if (marker.getAnimation() !== null) {
                        marker.setAnimation(null);
                    } else {
                        marker.setAnimation(google.maps.Animation.BOUNCE);
                    }
                }

                map = new google.maps.Map(document.getElementById('map'), {
                    center: initLatLng,
                    zoom: 14,
                    disableDefaultUI: true //https://developers.google.com/maps/documentation/javascript/controls
                });

                var marker = new google.maps.Marker({
                    position: initLatLng,
                    map: map,
                    // draggable: true,
                    animation: google.maps.Animation.DROP,
                    icon: iconBase + 'marina.png', //marina.png


                });
                // marker.setAnimation(google.maps.Animation.BOUNCE);
                marker.addListener('click', toggleBounce);
                map.setCenter(marker.getPosition());

                var title = '<a  target="_blank" href="http://taipeiomg.bhuntr.com/">Data.Taipei & Taipei OMG <br>綠色交通應用開發大賽</a>';
                var itemTaipei = getItemHtml('※', 'http://data.taipei/', 'Data.Taipei臺北市政府資料開放平台');
                var itemSource = getItemHtml('※數據來源:&nbsp;', 'http://transportation-data.taipei', '交通即時資料開放資料專區');
                var itemTeam = getItemHtml('※作品主題:&nbsp;<a  target="_blank" href="https://nodejs2016.azurewebsites.net/">走過必留痕跡!</a>&nbsp;&nbsp;by 諾得捷思隊', '', '');
                var contentString = '<div id="content" style="background-color:#f9f9f9"> ' +
                        '<h4 id="firstHeading" class="firstHeading"><b>' + title + '</b></h4>' +
                        '<div id="bodyContent">' + itemTaipei + itemSource + itemTeam
                        '</div>' +
                        '</div>';

                var infowindow = new google.maps.InfoWindow({
                    content: contentString
                });

                console.log(" initMap, anchorCnt" + anchorCnt);
                // not bo open again when click title
                if (anchorCnt == 0) {
                    infowindow.open(map, marker);
                }
                marker.addListener('click', function () {
                    infowindow.open(map, marker);
                });
            }
