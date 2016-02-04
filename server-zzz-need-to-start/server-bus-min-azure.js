// server.js
//
// Mark 陳炳陵, 2016-01-15 15:31
// prepare this to run on Azure, Application settings =>'Always on'

/*
   Firebase account is youbike2016@gmail.com
   https://www.firebase.com/docs/security/guide/user-security.html

   {
        "rules": {
            ".read": true,
            ".write": "auth.uid == 'mark'"
        }
    }


    https://bus-min-azure.firebaseio.com
    Uar18ys2L3KPpIjlqs4UcRYMOiBQEtM4Rc4EjYiM

    https://ubike-min-azure.firebaseio.com
    1tg5YHsfAFYKgNchyzntdVlNENLB01tN16pPlJLQ


    https://www.firebase.com/docs/web/guide/login/custom.html


    var FirebaseTokenGenerator = require("firebase-token-generator");


    // https://bus-min-azure.firebaseio.com
    var SECRET_bus="Uar18ys2L3KPpIjlqs4UcRYMOiBQEtM4Rc4EjYiM";

    // https://ubike-min-azure.firebaseio.com
    var SECRET_ubike="1tg5YHsfAFYKgNchyzntdVlNENLB01tN16pPlJLQ";

    
    var tokenGeneratorBus = new FirebaseTokenGenerator(SECRET_bus);
    var tokenGeneratorUbike = new FirebaseTokenGenerator(SECRET_ubike);

    var tokenBus = tokenGeneratorBus.createToken({ uid: "mark", some: "arbitrary", data: "here" });
    var tokenUbike = tokenGeneratorUbike.createToken({ uid: "mark", some: "arbitrary", data: "here" });

    console.log("tokenBus\n"+tokenBus);
    console.log("\n\ntokenUbike\n"+tokenUbike);

tokenBus
eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ2IjowLCJkIjp7InVpZCI6Im1hcmsiLCJzb21lIjoiYXJiaXRyYXJ5IiwiZGF0YSI6ImhlcmUifSwiaWF
0IjoxNDUyODQ1NDUxfQ.yQGZ4xBI-fKgkv94Bxef8xAmLiwkmVmYU6cgapz8d3o


tokenUbike
eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ2IjowLCJkIjp7InVpZCI6Im1hcmsiLCJzb21lIjoiYXJiaXRyYXJ5IiwiZGF0YSI6ImhlcmUifSwiaWF
0IjoxNDUyODQ1NDUxfQ.kjvnVangM6sDxP82_ZJ32GpysQECQ1bKFmk-OHNNgQU


*/
var tokenBus="eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ2IjowLCJkIjp7InVpZCI6Im1hcmsiLCJzb21lIjoiYXJiaXRyYXJ5IiwiZGF0YSI6ImhlcmUifSwiaWF0IjoxNDUyODQ1NDUxfQ.yQGZ4xBI-fKgkv94Bxef8xAmLiwkmVmYU6cgapz8d3o";
var tokenUbike="eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ2IjowLCJkIjp7InVpZCI6Im1hcmsiLCJzb21lIjoiYXJiaXRyYXJ5IiwiZGF0YSI6ImhlcmUifSwiaWF0IjoxNDUyODQ1NDUxfQ.kjvnVangM6sDxP82_ZJ32GpysQECQ1bKFmk-OHNNgQU";



// === 1. require section ===
var Firebase = require("firebase");     // to write to Firebase
var schedule = require('node-schedule');// to run schedule
var request = require('request');       //
var zlib = require('zlib');             // to unzip gz
var moment = require('moment');         // to format datetime
var jsonlint = require('jsonlint');     // to parse Json

// var url_target = "https://bus-min.firebaseio.com/";
// var firebaseRef = new Firebase(url_target);

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
    return 'm_'+moment().add(8,'hours').format('YYYY_MMDD_HHmm');
}


//-------------------------
// 3. plans and to execute
//-------------------------

// var plans = [
//     {from: "http://data.taipei/bus/BUSDATA", to: "https://bus-min-azure.firebaseio.com/", name: "定時車機資訊",token:tokenBus},
//     {from: "http://data.taipei/youbike", to: "https://ubike-min-azure.firebaseio.com/", name: "youbike即時資訊",token:tokenUbike}
// ];

    var busSrc= "http://data.taipei/bus/BUSDATA";
    var busTgt= "https://bus-min-azure.firebaseio.com/";
    var busName= "定時車機資訊";


    //,token:tokenBus},
    // {from: "http://data.taipei/youbike", to: "https://ubike-min-azure.firebaseio.com/", name: "youbike即時資訊",token:tokenUbike}

    var ubikeSrc= "http://data.taipei/youbike";
    var ubikeTgt= "https://ubike-min-azure.firebaseio.com/";
    var ubikeName= "youbike即時資訊";





// console.log(JSON.stringify(plans));
// plans.forEach(function (plan) {

    var refBus = new Firebase(busTgt);
    refBus.authWithCustomToken(tokenBus, function(error, authData) {
        if (error) {
            console.log("refBus Login Failed!", error);
        } else {
            console.log("refBus Login Succeeded!", authData);
            var j = schedule.scheduleJob('* * * * *', function(){
                var timeStampByMin=getTimeStampByMin()
                console.log("timeStampByMin => " + timeStampByMin);
                fetch_one_set_and_show_json_problem(
                    get_option(busSrc),
                    refBus,
                    busName,
                    timeStampByMin
                );
            })

        }
    });

    var refUbike = new Firebase(ubikeTgt);
    refUbike.authWithCustomToken(tokenUbike, function(error, authData) {
        if (error) {
            console.log("refUbike Login Failed!", error);
        } else {
            console.log("refUbike Login Succeeded!", authData);
            var j = schedule.scheduleJob('* * * * *', function(){
                var timeStampByMin=getTimeStampByMin()
                console.log("timeStampByMin => " + timeStampByMin);
                fetch_one_set_and_show_json_problem(
                    get_option(ubikeSrc),
                    refUbike,
                    ubikeName,
                    timeStampByMin
                );
            })

        }
    });






// })




function fetch_one_set_and_show_json_problem(opt_set, fbRef, name,timeStampByMin) {
    var tag= +"  "+timeStampByMin+" "+name;
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
                        console.log(tag+", json, ok! 準備寫入 firebase");

                         fbRef.child("current").set(json, onComplete);
                        fbRef.child(timeStampByMin).set(json, onComplete);
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
