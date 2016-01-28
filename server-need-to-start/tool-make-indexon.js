var Firebase = require("firebase");
var urlFirebase="https://bus-0119.firebaseio.com/";
var ref = new Firebase(urlFirebase);



ref.child('buslist3x').on("child_added", function(snap) {
  var val=snap.val();
  var bus=val['bus'];
//  console.log('"'+bus+'":{".indexOn": ["unix"]},');
// console.log('{bus:""'+bus+'"},');
console.log('"'+bus+'",');



})
