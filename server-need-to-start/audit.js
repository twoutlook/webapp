var Firebase = require("firebase");
var urlFirebase="https://bus-0119.firebaseio.com/";
var ref = new Firebase(urlFirebase);

var token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ2IjowLCJkIjp7InVpZCI6Im1hcmsiLCJzb21lIjoiYXJiaXRyYXJ5IiwiZGF0YSI6ImhlcmUifSwiaWF0IjoxNDUzMTcwNjgzfQ.9XZ0qWYpFfMhP4vSvEDnAXUvOv03N6wuNhfFabY-LH0";



//http://stackoverflow.com/questions/15990681/firebase-chat-removing-old-messages/
function cleanUpBusData4HrsOld(bus){
    console.log("cleanUpBusData4HrsOld(bus)"+bus);
  var refBus =ref.child(bus);

  /* NOTE for monitoring, */
  // var cnt99=0;
  // refBus.on('child_removed', function (snap) {
  //   cnt99++;
  //   // console.log(bus+" "+cnt99+ " deleted!");
  //
  //   var val = snap.val();
  //   var dt_unix=new Date(parseInt(val['unix']));
  //   console.log(val['unix']+"    "+", deleted,"+ dt_unix+ " "+val['bus']+" "+cnt99);
  // });



  var myEndAt=-4*1000*60*60+Math.floor(Date.now());
  endAt=""+myEndAt; // NOTE 1/26 22:45, *******************(1)
  var cnt=0;
  var query = refBus.orderByChild("unix").endAt(endAt).limitToFirst(5); // *****(2)

  // (1) 要強制轉成字串才有效
  // (2) 值太大時,在1300多時就跳掉了,但沒錯誤信息,應該是Firebase server就不處理了
  query.on("child_added", function(snap) {
    var key = snap.key();
    var val = snap.val();

    var dt_unix=new Date(parseInt(val['unix']));
    cnt++;
    var refToKill=refBus.child(key);
    // console.log(val['unix']+"    "+cnt+", deleting... unix: "+val['unix']+ dt_unix+ " "+val['bus']);

  //  snap.ref().remove();
     refToKill.remove(); // 刪的時候是動態的,又補進來刪
  });
}



ref.on('child_removed', function (snap) {
  cnt99++;
  // console.log(bus+" "+cnt99+ " deleted!");
var key = snap.key();

  console.log(key+" is deleted!!!");
});


ref.authWithCustomToken(token, function (error, authData) {
    if (error) {
        console.log(urlFirebase + ",  Login Failed!", error);
    } else {
      console.log(urlFirebase + ", Login Succeeded! , uid=", authData.uid);
      console.log("...going to cleanUp");



      var onComplete = function(error) {
        if (error) {
          console.log('Synchronization failed');
        } else {
          console.log('Synchronization succeeded');
        }
      };


      // Same as the previous example, except we will also log
      // a message when the delete has finished synchronizing




      // cleanUpBusData4HrsOld("078-FR");


      // NOTE WORKING
      // var fredRef = new Firebase("https://bus-0119.firebaseio.com/080-FR");
      //   fredRef.remove(onComplete);

      ref.child('buslist3x').once("child_added", function(snap) {
        var val=snap.val();
        var bus=val['bus'];
        // NOTE make "277-FP":{".indexOn": ["unix"]},
        // console.log('"'+bus+'":{".indexOn": ["unix"]},');

        var fredRef = new Firebase("https://bus-0119.firebaseio.com/"+bus");  


      })

    }
});



// var ref = new Firebase('https://bus-0119.firebaseio.com/716-FM');
// var now = Date.now();
// var cutoff = now - 24 * 60 * 60 * 1000;
// var old = ref.orderByChild('fb').startAt(cutoff).limitToLast(1);
// var listener = old.on('child_added', function(snapshot) {
//
//   console.log(snapshot.key());
//   console.log(snapshot.val());
//
//   //  snapshot.ref().remove();
// });

// var cnt=0;
// ref.limitToFirst(1).on("value", function(snapshot) {
//   cnt++;
// console.log("cnt="+cnt);
//   console.log("...start audit --- "+snapshot.numChildren());
//   console.log(snapshot.val());
//   console.log(snapshot.key());
//   var val=snapshot.val();
//   val.for
//
//
// }, function (errorObject) {
//   console.log("The read failed: " + errorObject.code);
// });
