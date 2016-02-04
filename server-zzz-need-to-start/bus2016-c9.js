// bus2016.js
//
// Mark 陳炳陵, 2016-01-16 21:10
// prepare this to run on Azure, Application settings =>'Always on'





// === 1. require section ===
var Firebase = require("firebase");     // to write to Firebase
var schedule = require('node-schedule');// to run schedule
var request = require('request');       //
var zlib = require('zlib');             // to unzip gz
var moment = require('moment');         // to format datetime
var jsonlint = require('jsonlint');     // to parse Json


var urlSrc= "http://data.taipei/bus/BUSDATA";
//成對要改
//var token="eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ2IjowLCJkIjp7InVpZCI6Im1hcmsiLCJzb21lIjoiYXJiaXRyYXJ5IiwiZGF0YSI6ImhlcmUifSwiaWF0IjoxNDUyOTQ5OTQ1fQ.68ett9WCwQzrY019k2vhLy_peiuGs-wf_Pantsu9htw";
// var fbRef = new Firebase("https://bus2016.firebaseio.com/");

var token="eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ2IjowLCJkIjp7InVpZCI6Im1hcmsiLCJzb21lIjoiYXJiaXRyYXJ5IiwiZGF0YSI6ImhlcmUifSwiaWF0IjoxNDUzMDcyOTI3fQ.1z7km7s1tPg0hN6IxBdhVhe4EQqiKVfKZZA_o_eVEI0"

var fbRef = new Firebase("https://bus2016-c9.firebaseio.com/");
// var MongoClient = require('mongodb').MongoClient;
// var assert = require('assert');
// var ObjectId = require('mongodb').ObjectID;
// var url = 'mongodb://localhost:27017/bus';



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

function getTimeStampByMin(){
  var year=moment().add(8,'hours').format('YYYY');
  if (year=='2016') yearCode="d";//so it will show after current
  if (year=='2017') yearCode="e";

    return yearCode+moment().add(8,'hours').format('MMDDHHmm');
}

function getTwUnixTimestamp( busTime){ // 針對 urlSrc
  return 8*60*60+parseInt(busTime.substr(7,10))
}
function getUnixTimestamp( busTime){ // 針對 urlSrc
  return parseInt(busTime.substr(7,10))
}

function fetch_one_set_and_show_json_problem(opt_set) {
    timeStampByMin=getTimeStampByMin();
    var tag= +"  "+timeStampByMin+" "+"buses ";
    console.log(tag+" starting ...");
    var onComplete = function (error) {
        if (error) {
            console.log(tag+ ', failed ######################\n'+error);
        } else {
            console.log(tag+ ', done synchronization!');
        }
    };

    request.get(opt_set, function (error, response, body) {

        if (!error && response.statusCode == 200) {
            // If response is gzip, unzip first
            var encoding = response.headers['content-encoding'];
            if (encoding && encoding.indexOf('gzip') >= 0) {
                zlib.gunzip(body, function (err, dezipped) {
                    try {
                        var before=dezipped.length.toLocaleString();
                        var json_string = dezipped.toString('utf-8');
                    //    console.log("--"+ fb_set  + name +" size=" +before+" , 解壓縮, ok! 準備解析json, size="+json_string.length.toLocaleString());

                    } catch (err) {
                        console.log(tag+" zlib err \n"+err);
                        return;
                    }

                    // fix "id":"336	",
                    json_string = json_string.replace("	", "");

                    // var json= JSON.parse(json_string);
                    try {
                        var json = jsonlint.parse(json_string);
                        console.log(tag+", source json is ok! ");
                      //  console.log(tag+", TODO per bus record to update...");
                        //console.log(tag+JSON.stringify(json));
                        var busInfo=json.BusInfo;
                      //  console.log("bus info len is "+busInfo.length);

                        var tm=getTimeStampByMin();

                        fbRef.child("current").set(json,function(error){
                          if (error){
                            console.log(error);
                          }else{
                              console.log(tag+"sync current, done!");
                          }
                        });

                        for (i = 0; i < busInfo.length; i++) {
                            var bus=busInfo[i];
                            var busId=bus.BusID;
                            var busPos=bus.Latitude+','+bus.Longitude;
                            var busDt=bus.DataTime;
                            var data= busPos+ ","+getTwUnixTimestamp(busDt);
                          //  console.log("zzzbus id is "+bus.BusID+ " and data is"+data);
                            // console.log("busPos= "+busPos);
                            var loc={};
                            loc['lat']=bus.Latitude;
                            loc['lon']=bus.Longitude;

                    



                            // TODO 這個在Azure是OK的,但是在本機會多出個小時?
                            var day = moment.unix(getTwUnixTimestamp(busDt)).format('YYYY-MM-DD HH:mm:ss');

                            loc['dt']=day;

                            // add all carNum to list
                            var forList={};
                            forList[busId]=day;
                            fbRef.child("list").update(forList,function(error){
                              if (error){
                                console.log(error);
                              }else{
                                  // console.log("ok");
                              }
                            });




                            var j={};
                             j[tm]=loc;
                            fbRef.child(bus.BusID).update(j,function(error){
                              if (error){
                                console.log(error);
                              }else{
                                  // console.log("ok");
                              }
                            });

                        }
                        //  fbRef.child("current").set(json, onComplete);
                        // fbRef.child(timeStampByMin).set(json, onComplete);
                    } catch (err) {
                        console.log(tag+" jsonlint err \n"+err);
                    }
                });
            } else {  // PathDetail 附屬路線與路線對應資訊 1/12 20:52 跑到這邊來了
                 console.log(tag+"something is wrong here");
            }
        }
    })
}




fbRef.authWithCustomToken(token, function(error, authData) {
  if (error) {
    console.log("fbRef Login Failed!", error);
  } else {
    console.log("fbRef Login Succeeded! To start schedule!", authData);
    var j = schedule.scheduleJob('* * * * *', function(){ // per min
    var timeStampByMin=getTimeStampByMin()
      // console.log("timeStampByMin => " + timeStampByMin+" DO NOTHING HERE!");

      // fbRef.set(null);
      fetch_one_set_and_show_json_problem( get_option(urlSrc) );
    })

  }
});
