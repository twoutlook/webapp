var Firebase = require("firebase");
var urlFirebase="https://bus-0119.firebaseio.com/";
var ref = new Firebase(urlFirebase);

console.log("...tool2.js");

// ref.child('routesv4').on("child_added", function(snap) {
//   ref.on("child_added", function(snap) {
//   var key=snap.key();
//   var val=snap.val();
//   // var bus=val['bus'];
// //  console.log('"'+bus+'":{".indexOn": ["unix"]},');
// // console.log('{bus:""'+bus+'"},');
// var urlX="routesv4"+key
// var str='killBus("'+urlX+'");';
// console.log(str);
//
//
//
// })

// var refBusNumList=ref.child("buslistv4");
var refBusNumList=ref;

refBusNumList.limitToFirst(1).once("child_added", function(snapshot) {
  var key=snap.key();
  var val=snap.val();
  // var bus=val['bus'];
//  console.log('"'+bus+'":{".indexOn": ["unix"]},');
// console.log('{bus:""'+bus+'"},');
var urlX="routesv4"+key
var str='killBus("'+urlX+'");';
console.log(str);

});
