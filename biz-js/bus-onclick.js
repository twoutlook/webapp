
function showAnchor() {
    map.setCenter(initLatLng);
    anchorCnt++; // it won't show info window again
    console.log("anchorCnt=" + anchorCnt);
    initMap();
    $("#list").hide();
}

function showRouteBusListV2(){
  routeCnt=0;
  console.log("DOING... showRouteBusListV2");
  refRoutes.once("child_added", function (snapshot, prevChildKey) { // 就只有一個doc
      var key = snapshot.key();
      var val = snapshot.val();
      var obj = val;
      var route_name=[];

      var map_url=[];
      for(var key in obj){
          var attrName = key;
          var attrValue = obj[key];
          route_name[key]=obj[key].routeName;
          map_url[key]=obj[key].mapUrl;
          // console.log(key+" "+obj[key].routeName);
      }
      var obj={};
      refBuslist.once("child_added", function (snapshot, prevChildKey) { // 就只有一個doc
        routeCnt ++;

          var key = snapshot.key();
          var val = snapshot.val();
          var array = val;
          // console.log(val);
          var route_bus=[];
          var routeName_bus=[];

          var toOpen = true;
          for (var i = 0; i < array.length; i++) {
              var bus = array[i];
              var routeId=parseInt(bus['route']);
              if (  obj[bus['route']]===undefined){
                  obj[bus['route']]=bus['bus']+" "; // FOR THE VERY FIRST TIME
              }else{
                  obj[bus['route']]+=bus['bus']+" ";
              }
          }

          // console.log(JSON.stringify(obj));
          var str="備註: 只列出現在資料有公車的路線<table class='flat-table'>"
                  +" <tr><th>序號</th><th>路線編號</th><th>路線名稱</th><th>車輛數</th><th>車牌號碼</th></tr>";
          var cnt=0;
          for(var key in obj){
              if (route_name[key]===undefined){
                // TODO WHY?
              }else{
                  cnt++;
                  var temp=obj[key].split(" ");
                  str+=" <tr><th>"+cnt+"</th><td>"+key+"  "+"</td>"
                  +"<td><a target='_blank' href='"+ map_url[key]+"'>"+  "【"+route_name[key]+"】</a></td>"+
                  "<td> "+temp.length+"</td><td>"+obj[key]+"</td></tr>";
              }
          }
          str+="</table>";
          // NOTE working, 2/1 02:23
          document.getElementById("list").innerHTML =str;
      }); // END OF refBuslist.once
  }); // END OF refRoutes.once
} //
