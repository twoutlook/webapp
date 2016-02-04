var jsonfile = require('jsonfile')
var util = require('util')

var file = 'bus-stop.json'
jsonfile.readFile(file, function(err, obj) {
  // console.dir(obj)

  // for(var key in obj){
  //
  //   // console.dir(key)
  //   console.log(key);
  //   // console.log(obj[key]);
  //
  //
  // }
  var busInfo=obj['BusInfo'];
  var onlyRoute=16131;
  var json={};
  for(var i=0;i<busInfo.length;i++){
    var stop=busInfo[i];
    // if (stop.routeId==onlyRoute){
    //     console.log(i+" seq="+stop.seqNo+" "+stop.routeId+" "+stop.nameZh);
    // }
    if (json[stop.routeId]==undefined){
      json[stop.routeId]={};
      var temp=json[stop.routeId];
      temp[stop.nameZh]={lat:stop.showLat,lon:stop.showLon};
    }else{
      var temp=json[stop.routeId];
      temp[stop.nameZh]={lat:stop.showLat,lon:stop.showLon};
    }

  }
  var i=0;
  //  for(var key in json){
  //    i++;
  //   //  console.log(i+" "+key+" "+json[key]);
  //    console.log(i+" "+key+" ");
   //
  //     for(var key2 in json[key]){
  //       console.log(" "+key2+" "+json[key][key2].lat+","+json[key][key2].lon);
  //     }
  //  }
  // console.log(JSON.stringify(json));
  var fs = require('fs');

var routeStops="var routeStops="+JSON.stringify(json)+";";


  fs.writeFile("routeStops.js", routeStops, function(err) {
      if(err) {
          return console.log(err);
      }

      console.log("The file was saved!");
  });


})
