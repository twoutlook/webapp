/*
// adv-schd-001.js
//
// Mark 陳炳陵, 2016-01-22 08:47
// TODO: to get active car list for quickly maintaining dropdown list
ver 1--- https://bus-0119.firebaseio.com/current
ver 2--- https://bus-0119.firebaseio.com/buslist
ver 3--- https://bus-0119.firebaseio.com/buslist2
ver 4--- https://bus-0119.firebaseio.com/bus-num-list
   val





*/
var tag="batch-01.js "

// prepare this to run on Azure, Application settings =>'Always on'
var Firebase = require("firebase");
var urlFirebase = "https://bus-v2-0128.firebaseio.com/";
var fbRef = new Firebase(urlFirebase);
var token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ2IjowLCJkIjp7InVpZCI6Im1hcmsiLCJzb21lIjoiYXJiaXRyYXJ5IiwiZGF0YSI6ImhlcmUifSwiaWF0IjoxNDUzOTYyNDgxfQ.HReCDBhKRKcmHOVc0vL1A_EUnufRlurTAksdcGSniFA";

var urlSrc = "http://data.taipei/bus/BUSDATA";

// === 1. require section ===
var schedule = require('node-schedule');// to run schedule
var request = require('request');       //
var zlib = require('zlib');             // to unzip gz
var jsonlint = require('jsonlint');     // to parse Json

fbRef.authWithCustomToken(token, function (error, authData) {
    if (error) {
        console.log(urlFirebase + ",  Login Failed!", error);
    } else {
        // console.log(urlFirebase + ", Login Succeeded! To start schedule! Per minute, ", authData);

        console.log("\n==============    BATCH 01 ======================================");
        console.log(urlFirebase + ", Login Succeeded! To start schedule per minite, user=", authData.uid);
        console.log("=====================================================================================================\n");

        // *** TO RESET ***
        // fbRef.set(null);
        // fbRef.child("list").set(null);

        // start one first!!!
        fetch_one_set_and_show_json_problem(get_option(urlSrc));

        // Schedule starts here !!!
        var j = schedule.scheduleJob('* * * * *', function () { // per min
            fetch_one_set_and_show_json_problem(get_option(urlSrc));
        });
    }
});



//-------------------------
// 2. helper functions
//-------------------------

function get_option(urlx) {
    return {
        url: urlx,
        headers: {
            'X-some-headers': 'Some headers',
            'Accept-Encoding': 'gzip, deflate',
        },
        encoding: null
    }
}

function getTimeStampByMin() {
    return new Date();
}

function getTwUnixTimestamp(busTime) { // 針對 urlSrc
    return 8 * 60 * 60 + parseInt(busTime.substr(7, 10))
}
function getUnixTimestamp(busTime) { // 針對 urlSrc
    return parseInt(busTime.substr(7, 10))
}

function fetch_one_set_and_show_json_problem(opt_set) {
   // timeStampByMin = getTimeStampByMin();
    //var tag = +"  " + timeStampByMin + " " + ",bus ";
    console.log(Date()+ " starting ...");
    var onComplete = function (error) {
        if (error) {
            console.log(tag + ', failed ######################\n' + error);
        } else {
            console.log(tag + ', done synchronization!');
        }
    };

    request.get(opt_set, function (error, response, body) {

        if (!error && response.statusCode == 200) {
            // If response is gzip, unzip first
            var encoding = response.headers['content-encoding'];
            if (encoding && encoding.indexOf('gzip') >= 0) {
                zlib.gunzip(body, function (err, dezipped) {
                    try {
                        var before = dezipped.length.toLocaleString();
                        var json_string = dezipped.toString('utf-8');
                        //    console.log("--"+ fb_set  + name +" size=" +before+" , 解壓縮, ok! 準備解析json, size="+json_string.length.toLocaleString());

                    } catch (err) {
                        console.log(tag + " zlib err \n" + err);
                        return;
                    }

                    // fix "id":"336	",
                    json_string = json_string.replace("	", "");

                    // var json= JSON.parse(json_string);
                    try {
                        var json = jsonlint.parse(json_string);
                        console.log(tag + ", source json is ok! ");
                        //  console.log(tag+", TODO per bus record to update...");
                        //console.log(tag+JSON.stringify(json));
                        var busInfo = json.BusInfo;
                        //  console.log("bus info len is "+busInfo.length);



                        // UPDATE CURRENT
                        // fbRef.child("current").set(json, function (error) {
                        //     if (error) {
                        //         console.log(error);
                        //     } else {
                        //         console.log(tag + "sync current, done!");
                        //     }
                        // });

                        //
                        // NOTE: 這是解析當下活動車輛的資訊
                        //
                        // Mark 01/22 09:06
                        // FIX bus-num-list
                        var strBusNumList="";

                        var busList3=[];

                        for (var i = 0; i < busInfo.length; i++) {
                            var bus = busInfo[i];
                            
                              // console.log(bus.DataTime);
                            var unix = bus.DataTime               // "DataTime":"\/Date(1453424368000+0800)\/"
                                    .replace(/\\\/Date\(/, "")    // 去掉 \/Date(
                                    .replace(/\+0800/, "")        // 去掉 +0800
                                    .replace(/\)\\\//, "");       // 去掉 )\/

                            // FIX car-num-list
                            // i==0 ? strBusNumList=bus.BusID: strBusNumList+=" "+bus.BusID;
                            // console.log ("unix="+unix);
                            
                            busList3.push({
                                bus:bus.BusID,
                                lat: bus.Latitude,
                                lon: bus.Longitude, //RouteID
                                route: bus.RouteID, // NOTE by Mark, 2015/1/23 13:04 to show bus belonging to which route and route details
                                unix: unix // 
                            });



                          
                            // console.log(unix);

                            // NOTE: for buslist
                            var doc = {
                                bus: bus.BusID,
                                lat: bus.Latitude,
                                lon: bus.Longitude, //RouteID
                                route: bus.RouteID, // NOTE by Mark, 2015/1/23 13:04 to show bus belonging to which route and route details

                                // dt:bus.DataTime,
                                unix: unix, // remove unnecessary part of bus.DataTime
                                fb: Firebase.ServerValue.TIMESTAMP
                            }
                            // console.log(doc);

                            //NOTE
                            //
                            var urlBus = urlFirebase+"busmin/" + bus.BusID;
                            var refBus = new Firebase(urlBus);
                            refBus.push(doc, function (error) {   // 只要有出現的公車就加進來
                                if (error) {
                                    console.log('doc, Synchronization failed');
                                } else {
                                //  console.log('doc,Synchronization succeeded'+urlBus);
                                }
                            });

                            // fbRef.child("buslist/" + bus.BusID).set({sys: Firebase.ServerValue.TIMESTAMP}); //這個成本好像太高了!
                            fbRef.child("buslist/" + bus.BusID).set({doc}); //NOTE 1/26 17:37 取代current


                        }



var onSetComplete = function(error) {
  if (error) {
    console.log('onSetComplete Synchronization failed');
  } else {
    console.log('onSetComplete Synchronization succeeded');
  }
};

                        fbRef.child('buslistv6/doc').set(busList3,onSetComplete ); // 只要有出現的公車就加進來




                    } catch (err) {
                        console.log( " jsonlint err \n" + err);
                    }
                });
            } else {  // PathDetail 附屬路線與路線對應資訊 1/12 20:52 跑到這邊來了
                console.log("something is wrong here");
            }
        }
    });
}
