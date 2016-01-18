// fb-busxx1.js
//
// Mark 陳炳陵, 2016-01-16 21:10
// to make buslist

// === 1. require section ===
var Firebase = require("firebase");     // to write to Firebase
var schedule = require('node-schedule');// to run schedule
// var request = require('request');       //
// var zlib = require('zlib');             // to unzip gz
// var moment = require('moment');         // to format datetime
// var jsonlint = require('jsonlint');     // to parse Json

var token="eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ2IjowLCJkIjp7InVpZCI6Im1hcmsiLCJzb21lIjoiYXJiaXRyYXJ5IiwiZGF0YSI6ImhlcmUifSwiaWF0IjoxNDUzMDcyOTI3fQ.1z7km7s1tPg0hN6IxBdhVhe4EQqiKVfKZZA_o_eVEI0"
var urlFirebase="https://bus2016-c9.firebaseio.com/";

var ref = new Firebase(urlFirebase);
var refMakeBuslist=ref.child("buslist");


makeBuslist();

function makeBuslist(){
  var ref2 = new Firebase("https://bus2016-c9.firebaseio.com/");
    var cnt=0;
    ref2.on("child_added", function (snapshot, prevChildKey) {

        if (snapshot.key() == 'current' ||snapshot.key() == 'list'||snapshot.key() == 'buslist') {
            // not Bus
        }else{
           cnt++;
            // console.log(cnt+" "+snapshot.key());
            var doc={BusID:snapshot.key()}
            console.log(doc);
            // refMakeBuslist.push(doc);
        }
    })
    // console.log(cnt +" bus records just add!");
}
var onComplete = function(error) {
  if (error) {
    console.log('Synchronization failed');
  } else {
    console.log('just reset, going to make a new one');
    makeBuslist();
  }
};


//
// ref.authWithCustomToken(token, function(error, authData) {
//   if (error) {
//     console.log("fbRef Login Failed!", error);
//   } else {
//     console.log("fbRef Login Succeeded! To start schedule!", authData);
//     var j = schedule.scheduleJob('* * * * *', function(){ // per min
//   //  var timeStampByMin=getTimeStampByMin()
//       // console.log("timeStampByMin => " + timeStampByMin+" DO NOTHING HERE!");
//
//       // fbRef.set(null);
//         refMakeBuslist.set(null, onComplete);
//     })
//
//   }
// });
  // refMakeBuslist.set(null, onComplete);
// refMakeBuslist.set(null, onComplete);

// for TESTING
//fetch_one_set_and_show_json_problem( get_option(urlSrc) );


// fbRef.authWithCustomToken(token, function(error, authData) {
//   if (error) {
//     console.log("fbRef Login Failed!", error);
//   } else {
//     console.log("fbRef Login Succeeded! To start schedule!", authData);
//     var j = schedule.scheduleJob('* * * * *', function(){ // per min
//     var timeStampByMin=getTimeStampByMin()
//       // console.log("timeStampByMin => " + timeStampByMin+" DO NOTHING HERE!");
//
//       // fbRef.set(null);
//       fetch_one_set_and_show_json_problem( get_option(urlSrc) );
//     })
//
//   }
// });
