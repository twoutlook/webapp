/*

1.
https://bus-0119.firebaseio.com/?page=Security
 ".write": "auth.uid == 'mark'"
2.
https://bus-0119.firebaseio.com/?page=Auth
2400 Months

3.
https://bus-0119.firebaseio.com/?page=Admin
r8Kykut0XJjRDWnJRfgHXiIshQYA7suKRVjI6gDi


4.
eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ2IjowLCJkIjp7InVpZCI6Im1hcmsiLCJzb21lIjoiYXJiaXRyYXJ5IiwiZGF0YSI6ImhlcmUifSwiaWF0IjoxNDUzOTYyNDgxfQ.HReCDBhKRKcmHOVc0vL1A_EUnufRlurTAksdcGSniFA
*/

var SECRET="jRvwbFaU6FPH7FAz2jqonF1w2cAGgrHmHIDbjobF";

var uid="mark";

// No need to change following
var FirebaseTokenGenerator = require("firebase-token-generator");
var tokenGenerator = new FirebaseTokenGenerator(SECRET);
var token = tokenGenerator.createToken({ uid:uid, some: "arbitrary", data: "here" });
console.log("\n\n"+token);
/*
eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ2IjowLCJkIjp7InVpZCI6Im1hcmsiLCJzb21lIjoiYXJiaXRyYXJ5IiwiZGF0YSI6ImhlcmUifSwiaWF0IjoxNDUzOTYyMTkwfQ.vZspb615YTk8XE_FjrNauEQF8j4lixui73AWc31ILis

*/
