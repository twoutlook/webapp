// Mark 陳炳陵, 2016-01-12 14:08


// === 1. require section ===
var Firebase = require("firebase");
var schedule = require('node-schedule');
var request = require('request');
var zlib = require('zlib');
var moment = require('moment');

var jsonlint = require('jsonlint');

var url_target = "https://youbike-minute.firebaseio.com/";
var firebaseRef = new Firebase(url_target);

var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');
var ObjectId = require('mongodb').ObjectID;
var url = 'mongodb://localhost:27017/ubike';


// === 2.  ===
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

var plans = [
    {from: "http://data.taipei/bus/PathDetail", to: "bus01", name: "附屬路線與路線對應資訊"},
    {from: "http://data.taipei/bus/CarInfo", to: "bus02", name: "車輛基本資訊"},
    {from: "http://data.taipei/bus/OrgPathAttribute", to: "bus07", name: "路線、營業站對應"},
    {from: "http://data.taipei/bus/PROVIDER", to: "bus08", name: "業者營運基本資料"},
    {from: "http://data.taipei/bus/ROUTE", to: "bus09", name: "路線"},
    {from: "http://data.taipei/bus/ROUTEGeom", to: "bus15", name: "公車路線線型開放格式"},
    // {from:"http://data.taipei/bus/DownloadShp",to:"bus16",name:"公車路線線型 shp 格式"},
    {from: "http://data.taipei/bus/TimeTable", to: "bus03", name: "預定班表資訊"},
    {from: "http://data.taipei/bus/SemiTimeTable", to: "bus04", name: "機動班次時刻表"},
    {from: "http://data.taipei/bus/BUSDATA", to: "bus05", name: "定時車機資訊"},
    {from: "http://data.taipei/bus/BUSEVENT", to: "bus06", name: "定點車機資訊"},
    {from: "http://data.taipei/bus/IStopPath", to: "bus11", name: "智慧型站牌所屬路線"},
    {from: "http://data.taipei/bus/IStop", to: "bus12", name: "智慧型站牌"},
    {from: "http://data.taipei/bus/Stop", to: "bus10", name: "站牌"},
    {from: "http://data.taipei/bus/CarUnusual", to: "bus13", name: "車機異常資訊"},
    {from: "http://data.taipei/bus/StopLocation", to: "bus14", name: "站位資訊"},
    {from: "http://data.taipei/bus/EstiamteTime", to: "bus17", name: "預估到站時間"},
//
//{from: "http://data.taipei/opendata/datalist/apiAccess?scope=resourceAquire&rid=55ec6d6e-dc5c-4268-a725-d04cc262172b", to: "mrt01", name: "捷運列車到站資料"},
//
  //  {from: "http://data.taipei/tisv/VD", to: "ctr01", name: "道路速率"},
//    {from: "http://data.taipei/tisv/VDDATA", to: "ctr02", name: "車輛偵測器(VD)資料"},
 //   {from: "http://data.taipei/tisv/CMS", to: "ctr03", name: "資訊可變標誌(CMS)顯示內容"},
    //
      {from: "http://data.taipei/tcmsv/alldesc", to: "prk01", name: "臺北市停車場資訊"},
    {from: "http://data.taipei/tcmsv/allavailable", to: "prk02", name: "剩餘停車位數"},
    //
      {from: "http://data.taipei/youbike", to: "bik01", name: "youbike即時資訊"},
    




];



function getNowISO(){
      //http://stackoverflow.com/questions/10645994/node-js-how-to-format-a-date-string-in-utc
    // var dt=new Date().toISOString().
    //     replace(/T/, ' ').      // replace T with a space
    //     replace(/\..+/, ''); 
    var dt= moment().add(8,'hours').format().
            replace(/T/, ' ').      // replace T with a space
            // replace(/\..+/, ''); 
          replace(/\+.+/, ''); 
    
    return dt;
}
var dateFormat=require('dateformat');

function getNowMilitary(){
   
    return moment().add(8,'hours').format('YYYY_MMDD_HHmm');
}


var plans = [
     {from: "http://data.taipei/youbike", to: "bik01", name: "youbike即時資訊"}
   
];



//------------------------- 
// reset Firebase 
//------------------------- 
// firebaseRef.set(null);
// console.log(firebaseRef.toString()+" is reset!") ;
// process.exit();

//------------------------- 
// execute plans
//------------------------- 
 
plans.forEach(function (plan) {
    // firebaseRef.child(plan.to+"-plan").set(plan);
    console.log("plan => " + plan.from + " " + plan.to + " " + plan.name);
   
    
    
    var j = schedule.scheduleJob('* * * * *', function(){
         fetch_one_set_and_show_json_problem(get_option(plan.from), plan.to, plan.name);
    })
})
// -------------------------------------------------

function setSetCnt(setName){
    if (setName.substr(0,3)==='bus'){   
        var r1=firebaseRef.child(setName+'/BusInfo');
        if (setName==='bus15'){
             var r1=firebaseRef.child(setName+'/kml/Folder/Placemark');
        }
    }
    if (setName.substr(0,3)==='bik'){   
        var r1=firebaseRef.child(setName+'/retVal');
    }
      if (setName.substr(0,3)==='ctr'){   
        var r1=firebaseRef.child(setName+'/data/park');
    }
         if (setName.substr(0,3)==='prk'){   
        var r1=firebaseRef.child(setName+'/data/park');
    }
    
    
    
   
   
    r1.on("value", function(snapshot) {
        var cnt=snapshot.numChildren();
        console.log(setName+" cnt: " + cnt);
  
    //   var json="{'cnt' : '"+cnt+"'}";
    //     console.log (setName+" json:"+json);
 
     //   var r=new Firebase(urlFirebase);
        var refUpd=firebaseRef.child(setName+"-cnt");
        refUpd.set(cnt);
    });
}


function fetch_one_set_and_show_json_problem(opt_set, fb_set, name) {
    var onComplete = function (error) {
        if (error) {
            console.log("------"+ fb_set + name + " " + opt_set.url + " =>https://omg2016tools.firebaseio.com/" + fb_set + '...Synchronization failed ######################');
        } else {
            console.log("------" + fb_set+ name + " " + opt_set.url + " =>https://omg2016tools.firebaseio.com/" + fb_set + '...Synchronization succeeded!');
         //   setSetCnt(fb_set);
            // add cnt
            //var r1=
            //firebaseRef.child(fb_set+"_cnt").set(cnt, onComplete);
                    
            
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
                        console.log("--"+ fb_set  + name +" size=" +before+" , 解壓縮, ok! 準備解析json, size="+json_string.length.toLocaleString());
                        
                    } catch (err) {
                        console.log("\n\n--XXX 壓縮檔有問題 XXX " + fb_set + name + " " + opt_set.url + " \n");
                        return;
                    }

                    // fix "id":"336	",
                    json_string = json_string.replace("	", "");

                    // var json= JSON.parse(json_string);
                    try {
                        var json = jsonlint.parse(json_string);
                        console.log("--" + fb_set + name + " , json, ok! 準備寫入 firebase");
                        
                        
                        
                        
                        MongoClient.connect(url, function (err, db) {
                              if (err) {
                                console.log('Unable to connect to the mongoDB server. Error:', err);
                              } else {
                                //HURRAY!! We are connected. :)
                                console.log('Connection established to', url);
                            
                            // db.products.insert( { _id: 10, item: "box", qty: 20 } )
                               var time_tag='t'+getNowMilitary();
                               db.collection('min').insert(
                                  { _id: time_tag,json},
                                
                                  function(err, results) {
                                      if (err){
                                        console.log("XXXXXXXXXXXXXXXX"+err);
                                          
                                      }else{
                                            console.log("VVVVVVVVVVVVVVVVV");
                                      }
                                       
                                //   console.log(results);
                                //   callback();
                               });
                            
                            
                              }
                            })

                        
                        
                        
                        
                        
                        
                        
                        
                        firebaseRef.child(getNowMilitary()).set(json, onComplete);
                    } catch (err) {
                            console.log("");
                      console.log(fb_set+name+"\n先顯示解壓縮後的文字檔的前200個字元 => \n"+json_string.substr(1,200));
                         console.log("\n");
                         console.log("\n以下是 jsonlint 提供的err.message \n----------------\n"+err.message+"\n----------------\n");
                   
                    //   console.log("這是 jsonlint 提供的err.name =>"+err.name);
                         console.log("\n");
             
                       
                       
                        // console.log("--@@@ json 有問題 @@@"+ fb_set  + name + " " + opt_set.url + " ,err = " + err);
                        //   console.log("err = "+err.message);
                    }
                });
            } else {  // PathDetail 附屬路線與路線對應資訊 1/12 20:52 跑到這邊來了
                      // 
                // Response is not gzipped
                 // fix "id":"336	",
                    
                    // var json_string = body.replace("	", "");
                    var json_string=body;
                    console.log("\nxx"+ fb_set  + name +" , 不是完整的壓縮檔案, 先取能解壓縮的部份,再解析json");
                    console.log("===============");
                    console.log("http://www.gzip.org/recover.txt");
                    console.log("===============\n");
                    
                    
                    // https://fetch-bus01-twoutlook.c9users.io/get01.php?url=http://data.taipei/bus/PathDetail
                    var url2="https://fetch-bus01-twoutlook.c9users.io/get01.php?url="+opt_set.url;
                    
                    
                    var request = require('request');
                      request(url2, function (error, response, body) {
                        if (!error && response.statusCode == 200) {
                          //console.log(body) // Show the HTML for the Google homepage.
                          
                            try {
                          var json = jsonlint.parse(body);
                        console.log("--" + fb_set + name + " , json, ok! 準備寫入 firebase");
                        firebaseRef.child(fb_set).set(json, onComplete);
                    } catch (err) {
                       console.log("");
                      console.log(fb_set+name+"\n先顯示解壓縮後的文字檔的前200個字元 => \n"+body.substr(1,200));
                         console.log("\n");
                       console.log("\n以下是  jsonlint 提供的err.message \n----------------\n"+err.message+"\n----------------\n");
                    //   console.log("這是 jsonlint 提供的err.name =>"+err.name);
                         console.log("\n");
                 //       console.log("--@@@ json 有問題 @@@"+ fb_set  + name + " " + opt_set.url + " ,err = " + err);
                        //   console.log("err = "+err.message);
                    }
                          
                          
                          
                        }
                      })
                    
                    
                    
                    
                    // request.get(get_option(url2), function (error, response, body) {
                       
                    //     var json= JSON.parse(body);
                    // try {
                    //     var json = jsonlint.parse(json_string);
                    //     console.log("--" + fb_set + name + " , json, ok! 準備寫入 firebase");
                    //     firebaseRef.child(fb_set).set(json, onComplete);
                    // } catch (err) {
                    //     console.log("--@@@ json 有問題 @@@"+ fb_set  + name + " " + opt_set.url + " ,err = " + err);
                    //     //   console.log("err = "+err.message);
                    // }
                       
                    // });
                    
                    
                  
                
                
                
            }
        }
    })
}
