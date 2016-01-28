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
  // cnt99++;
  console.log(snap.ref().toString()+ " deleted!");
  var key = snap.key();
  console.log(key+" is deleted!!!");
});


    var killing="080-FZ";
      var onComplete = function(error) {
        if (error) {
          console.log('Synchronization failed');
        } else {
          console.log(killing+'    ...080-FZ, killed Synchronization succeeded');
        }
      };

    function killBus(bus){
        killing=bus;
      var fredRef = new Firebase("https://bus-0119.firebaseio.com/"+bus);
      fredRef.remove(onComplete);
      };
ref.authWithCustomToken(token, function (error, authData) {
    if (error) {
        console.log(urlFirebase + ",  Login Failed!", error);
    } else {
      console.log(urlFirebase + ", Login Succeeded! , uid=", authData.uid);
      console.log("...going to cleanUp,,&&&&&++++++++++++++++++++++");



      //working !!!




   killBus("776-FL");
killBus("776-FR");
killBus("776-FZ");
killBus("777-FL");
killBus("777-FR");
killBus("777-FZ");
killBus("778-FL");
killBus("778-FR");
killBus("778-FZ");
killBus("779-FL");
killBus("779-FM");
killBus("779-FR");
killBus("779-FW");
killBus("779-FZ");
killBus("779-U3");
killBus("780-FL");
killBus("780-FR");
killBus("780-FW");
killBus("780-FZ");
killBus("780-U3");
killBus("781-FL");
killBus("781-FR");
killBus("781-FW");
killBus("781-FZ");
killBus("781-U3");
killBus("782-FL");
killBus("782-FR");
killBus("782-FW");
killBus("782-FZ");
killBus("782-U3");
killBus("783-FL");
killBus("783-FR");
killBus("783-FW");
killBus("783-FZ");
killBus("783-U3");
killBus("785-FL");
killBus("785-FR");
killBus("785-FW");
killBus("785-FY");
killBus("785-FZ");
killBus("786-FR");
killBus("786-FY");
killBus("786-FZ");
killBus("786-U3");
killBus("787-FR");
killBus("787-FY");
killBus("787-FZ");
killBus("787-U3");
killBus("788-FY");
killBus("788-U3");
killBus("789-FZ");
killBus("789-U3");
killBus("790-FZ");
killBus("791-FZ");
killBus("792-FL");
killBus("792-FZ");
killBus("793-FL");
killBus("793-FZ");
killBus("795-FL");
killBus("795-FZ");
killBus("796-FL");
killBus("796-FZ");
killBus("797-FL");
killBus("797-FZ");
killBus("798-FL");
killBus("798-FZ");
killBus("799-FL");
killBus("799-FZ");
killBus("800-FL");
killBus("800-FZ");
killBus("801-FR");
killBus("801-FT");
killBus("801-FW");
killBus("801-FX");
killBus("801-U3");
killBus("802-FR");
killBus("802-FT");
killBus("802-FW");
killBus("802-FX");
killBus("802-U3");
killBus("803-FR");
killBus("803-FT");
killBus("803-FW");
killBus("803-FX");
killBus("803-U3");
killBus("805-FR");
killBus("805-FT");
killBus("805-FW");
killBus("805-FX");
killBus("805-U3");
killBus("806-FR");
killBus("806-FT");
killBus("806-FW");
killBus("806-FX");
killBus("806-U3");
killBus("807-FR");
killBus("807-FT");
killBus("807-FW");
killBus("807-FX");
killBus("807-U3");
killBus("808-FR");
killBus("808-FT");
killBus("808-FW");
killBus("808-FX");
killBus("808-U3");
killBus("809-FR");
killBus("809-FT");
killBus("809-FW");
killBus("809-FX");
killBus("809-U3");
killBus("810-FR");
killBus("810-FT");
killBus("810-FW");
killBus("810-U3");
killBus("811-FR");
killBus("811-FT");
killBus("811-FW");
killBus("811-FX");
killBus("812-FR");
killBus("812-FT");
killBus("812-FW");
killBus("812-FX");
killBus("812-U3");
killBus("813-FR");
killBus("813-FT");
killBus("813-FW");
killBus("813-FX");
killBus("813-U3");
killBus("815-FR");
killBus("815-FT");
killBus("815-FW");
killBus("815-FX");
killBus("815-U3");
killBus("816-FR");
killBus("816-FT");
killBus("816-FW");
killBus("816-U3");
killBus("817-FR");
killBus("817-FT");
killBus("817-FW");
killBus("817-U3");
killBus("818-FR");
killBus("818-FT");
killBus("818-FW");
killBus("818-U3");
killBus("819-FR");
killBus("819-FT");
killBus("819-FW");
killBus("819-U3");
killBus("820-FR");
killBus("820-FT");
killBus("820-FW");
killBus("820-U3");
killBus("821-FR");
killBus("821-FT");
killBus("821-FW");
killBus("821-FX");
killBus("821-U3");
killBus("822-FR");
killBus("822-FT");
killBus("822-FX");
killBus("822-U3");
killBus("823-FT");
killBus("823-FX");
killBus("823-U3");
killBus("825-FT");
killBus("825-FX");
killBus("825-U3");
killBus("826-FT");
killBus("826-FX");
killBus("826-U3");
killBus("827-FR");
killBus("827-FT");
killBus("827-FX");
killBus("827-U3");
killBus("828-FR");
killBus("828-FT");
killBus("828-FX");
killBus("828-U3");
killBus("829-FR");
killBus("829-FT");
killBus("829-FX");
killBus("829-U3");
killBus("830-FR");
killBus("830-FT");
killBus("830-FX");
killBus("830-U3");
killBus("831-FR");
killBus("831-FT");
killBus("831-FX");
killBus("831-U3");
killBus("832-FR");
killBus("832-FT");
killBus("832-FU");
killBus("832-FX");
killBus("832-U3");
killBus("833-FR");
killBus("833-FT");
killBus("833-FU");
killBus("833-FW");
killBus("833-FX");
killBus("833-U3");
killBus("835-FR");
killBus("835-FT");
killBus("835-FU");
killBus("835-FW");
killBus("835-FX");
killBus("835-U3");
killBus("836-FR");
killBus("836-FT");
killBus("836-FU");
killBus("836-FX");
killBus("836-U3");
killBus("837-FR");
killBus("837-FT");
killBus("837-FX");
killBus("837-U3");
killBus("838-FR");
killBus("838-FT");
killBus("838-FX");
killBus("838-U3");
killBus("839-FR");
killBus("839-FT");
killBus("839-FU");
killBus("839-FX");
killBus("839-U3");
killBus("840-FR");
killBus("840-FT");
killBus("840-FU");
killBus("840-FX");
killBus("840-U3");
killBus("841-FR");
killBus("841-FT");
killBus("841-FX");
killBus("841-U3");
killBus("842-FR");
killBus("842-FT");
killBus("842-FU");
killBus("842-FX");
killBus("842-U3");
killBus("843-FR");
killBus("843-FT");
killBus("843-FU");
killBus("843-FX");
killBus("843-U3");
killBus("845-FR");
killBus("845-FT");
killBus("845-FX");
killBus("845-U3");
killBus("846-FR");
killBus("846-FT");
killBus("846-FX");
killBus("846-U3");
killBus("847-FR");
killBus("847-FT");
killBus("847-FW");
killBus("847-FX");
killBus("847-U3");
killBus("848-FR");
killBus("848-FT");
killBus("848-FU");
killBus("848-FW");
killBus("848-FX");
killBus("848-U3");
killBus("849-FR");
killBus("849-FT");
killBus("849-FW");
killBus("849-FX");
killBus("849-U3");
killBus("850-FR");
killBus("850-FW");
killBus("850-FX");
killBus("850-U3");
killBus("851-FR");
killBus("851-FW");
killBus("851-U3");
killBus("852-FR");
killBus("852-FU");
killBus("852-FW");
killBus("852-U3");
killBus("853-FR");
killBus("853-FU");
killBus("853-FW");
killBus("853-U3");
killBus("855-FR");
killBus("855-FU");
killBus("855-FW");
killBus("855-U3");
killBus("856-FR");
killBus("856-FW");
killBus("856-U3");
killBus("857-FR");
killBus("857-FW");
killBus("858-FR");
killBus("858-FU");
killBus("858-FW");
killBus("859-FR");
killBus("859-FW");
killBus("860-FR");
killBus("860-FU");
killBus("860-FW");
killBus("861-FR");
killBus("861-FU");
killBus("861-FW");
killBus("862-FR");
killBus("862-FW");
killBus("863-FR");
killBus("863-FW");
killBus("865-FR");
killBus("865-FW");
killBus("866-FR");
killBus("866-FW");
killBus("867-FR");
killBus("867-FW");
killBus("872-FR");
killBus("873-FR");
killBus("875-FR");
killBus("876-FR");
killBus("877-FR");
killBus("878-FR");
killBus("879-FR");
killBus("880-FR");
killBus("881-FR");
killBus("882-FR");
killBus("883-FR");
killBus("888-FS");
killBus("889-FS");
killBus("889-U3");
killBus("890-FS");
killBus("890-U3");
killBus("891-FR");
killBus("891-FS");
killBus("891-U3");
killBus("892-FR");
killBus("892-U3");
killBus("893-FR");
killBus("893-U3");
killBus("895-FR");
killBus("895-U3");
killBus("896-FR");
killBus("896-U3");
killBus("897-FR");
killBus("897-U3");
killBus("898-FR");
killBus("898-U3");
killBus("899-FR");
killBus("899-U3");
killBus("900-FR");
killBus("900-U3");
killBus("901-FR");
killBus("902-FR");
killBus("902-FU");
killBus("903-FR");
killBus("903-FU");
killBus("905-FR");
killBus("906-FR");
killBus("906-FU");
killBus("907-FR");
killBus("908-FR");
killBus("909-FR");
killBus("910-FR");
killBus("911-FR");
killBus("912-FR");
killBus("913-FR");
killBus("915-FR");
killBus("916-FR");
killBus("917-FR");
killBus("918-FR");
killBus("919-FR");
killBus("923-XH");
killBus("928-U3");
killBus("929-U3");
killBus("930-U3");
killBus("931-U3");
killBus("932-U3");
killBus("933-U3");
killBus("935-U3");
killBus("936-U3");
killBus("937-U3");
killBus("940-U5");
killBus("941-U5");
killBus("942-U5");
killBus("945-U5");
killBus("946-U5");
killBus("947-U5");
killBus("948-U5");
killBus("949-U5");
killBus("950-U5");
killBus("951-U5");
killBus("952-U5");
killBus("953-U3");
killBus("953-U5");
killBus("955-U3");
killBus("955-U5");
killBus("956-U3");
killBus("956-U5");
killBus("957-U3");
killBus("957-U5");
killBus("958-U3");
killBus("958-U5");
killBus("959-U3");
killBus("959-U5");
killBus("960-U3");
killBus("960-U5");
killBus("961-U3");
killBus("961-U5");
killBus("962-U3");
killBus("962-U5");
killBus("963-U3");
killBus("963-U5");
killBus("965-U5");
killBus("966-FN");
killBus("966-U3");
killBus("966-U5");
killBus("967-FN");
killBus("967-U3");
killBus("967-U5");
killBus("968-FN");
killBus("968-U3");
killBus("968-U5");
killBus("969-FN");
killBus("969-U3");
killBus("969-U5");
killBus("970-FN");
killBus("970-U3");
killBus("970-U5");
killBus("971-FN");
killBus("971-U3");
killBus("971-U5");
killBus("972-FN");
killBus("973-FN");
killBus("973-U3");
killBus("975-FN");
killBus("975-U3");
killBus("976-FN");
killBus("977-FN");
killBus("977-U3");
killBus("978-FN");
killBus("979-FN");
killBus("980-FN");
killBus("981-FN");
killBus("982-FN");
killBus("983-FN");
killBus("985-FN");
killBus("986-FN");
killBus("987-FN");
killBus("988-FN");
killBus("988-FZ");
killBus("989-FN");
killBus("989-FZ");
killBus("990-FZ");
killBus("991-FZ");
killBus("992-FZ");
killBus("992-U5");
killBus("993-FZ");
killBus("995-FZ");
killBus("997-FZ");
killBus("998-FZ");
killBus("999-FZ");
killBus("FAA-026");
killBus("FAA-027");
killBus("FAA-028");
killBus("FAA-029");
killBus("FAA-030");
killBus("FAA-031");
killBus("FAA-032");
killBus("FAA-033");
killBus("FAA-035");
killBus("FAA-036");
killBus("FAA-038");
killBus("FAA-039");
killBus("FAA-050");
killBus("FAA-051");
killBus("FAA-052");
killBus("FAA-053");
killBus("FAA-055");
killBus("FAA-056");
killBus("FAA-057");
killBus("FAA-058");
killBus("FAA-059");
killBus("FAA-060");
killBus("FAA-061");
killBus("FAA-062");
killBus("FAA-063");
killBus("FAA-065");
killBus("FAA-066");
killBus("FAA-067");
killBus("FAA-068");
killBus("FAA-069");
killBus("FAA-070");
killBus("FAA-071");
killBus("FAA-072");
killBus("FAA-073");
killBus("FAA-075");
killBus("FAA-076");
killBus("FAA-077");
killBus("FAA-078");
killBus("FAA-079");
killBus("FAA-080");
killBus("FAA-081");
killBus("FAA-082");
killBus("FAA-083");
killBus("FAA-085");
killBus("FAA-086");
killBus("FAA-087");
killBus("FAA-088");
killBus("FAA-089");
killBus("FAA-090");
killBus("FAA-091");
killBus("FAA-092");
killBus("FAA-093");
killBus("FAA-095");
killBus("FAA-096");
killBus("FAA-097");
killBus("FAA-098");
killBus("FAA-099");
killBus("FAA-100");
killBus("FAA-101");
killBus("FAA-102");
killBus("FAA-103");
killBus("FAA-105");
killBus("FAA-106");
killBus("FAA-107");
killBus("FAA-108");
killBus("FAA-109");
killBus("FAA-110");
killBus("FAA-111");
killBus("FAA-112");
killBus("FAA-115");
killBus("FAA-116");
killBus("FAA-117");
killBus("FAA-118");
killBus("FAA-119");
killBus("FAA-120");
killBus("FAA-121");
killBus("FAA-122");
killBus("FAA-123");
killBus("FAA-125");
killBus("FAA-126");
killBus("FAA-127");
killBus("FAA-128");
killBus("FAA-129");
killBus("FAA-130");
killBus("FAA-131");
killBus("FAA-132");
killBus("FAA-133");
killBus("FAA-135");
killBus("FAA-136");
killBus("FAA-137");
killBus("FAA-138");
killBus("FAA-139");
killBus("FAA-150");
killBus("FAA-151");
killBus("FAA-152");
killBus("FAA-153");
killBus("FAA-155");
killBus("FAA-156");
killBus("FAA-157");
killBus("FAA-158");
killBus("FAB-026");
killBus("FAB-027");
killBus("FAB-028");
killBus("FAB-029");
killBus("FAB-030");
killBus("FAB-032");
killBus("FAB-033");
killBus("FAB-118");
killBus("FAB-120");
killBus("FAB-121");
killBus("FAB-122");
killBus("FAB-123");
killBus("FAB-125");
killBus("FAB-126");
killBus("FAB-127");

    }
});