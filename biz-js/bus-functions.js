
function selectRoute(){
  alert(mySelect.value+" "+route_name[mySelect.value]);
}

var route_name = [];


var favorites = [];


function prepareDdlRoute(){
refRoutes.once("child_added", function (snapshot, prevChildKey) { // 就只有一個doc
    var key = snapshot.key();
    var val = snapshot.val();
    var obj = val;



    var byHand = '<select  class="form-control" style="font-size:110%"  id="mySelect" onchange="selectRoute()">'
                +'  <option value="" disabled selected > === 請選擇路線 === </option>';
    var temp = "";

//http://stackoverflow.com/questions/979256/sorting-an-array-of-javascript-objects
function compare(a,b) {
if (a.routeName < b.routeName)
return -1;
else if (a.routeName > b.routeName)
return 1;
else
return 0;
}


    // obj.sort(mycomparator);

    for (var key in obj) {
        ttlRouteCnt++;
        // var attrName = key;
        // var attrValue = obj[key];
        route_name[key] = obj[key].routeName+"   "+obj[key].startStop+"=>"+obj[key].endStop;
        // console.log(key + " " + route_name[key]);
        //
        // byHand += '  <option value="' + key + '">' + route_name[key] + '</option>';
        var oneRoute={route:key,routeName:obj[key].routeName,startStop:obj[key].startStop,endStop:obj[key].endStop};
        // console.log(JSON.stringify(oneRoute));
        favorites.push(oneRoute);
        // ddlRouteObj.push({route:key,routeName:obj[key].routeName,startStop:obj[key].startStop,endStop:obj[key].endStop});
    }

    favorites.sort(compare);
    //  console.log(JSON.stringify(favorites));

  //  console.log("XXXXXXXXXXXXXx");
    for (var key in favorites) {


        var obj = favorites[key];

        // console.log(obj);


        // console.log(key + " " + xyz);
        // var xyz= obj[key].routeName+"   "+obj[key].startStop+"=>"+obj[key].endStop;

        byHand += '  <option value="' + obj.route + '">' +obj.routeName +" " +obj.startStop + "=>"+obj.endStop + '</option>';

    }



    byHand += ' </select>';
    document.getElementById("ddlRoute2").innerHTML = byHand;



    document.getElementById("routeCnt").innerHTML ="計有路線數:" +ttlRouteCnt ;
    $("#ddlRoute").show(1000, function () {
        $("#map").show(1000, function () {
            initMap();
        })
    });
});
}
