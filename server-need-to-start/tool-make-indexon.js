var Firebase = require("firebase");
var urlFirebase="https://bus-0119.firebaseio.com/";
var ref = new Firebase(urlFirebase);

console.log("...starting tool-make-indexon.js");

// ref.child('buslist3x').on("child_added", function(snap) {
  ref.on("child_added", function(snap) {
  var key=snap.key();
  var val=snap.val();
  // var bus=val['bus'];
//  console.log('"'+bus+'":{".indexOn": ["unix"]},');
// console.log('{bus:""'+bus+'"},');
console.log('"'+key+'",');



})
