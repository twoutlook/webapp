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
eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ2IjowLCJkIjp7InVpZCI6Im1hcmsiLCJzb21lIjoiYXJiaXRyYXJ5IiwiZGF0YSI6ImhlcmUifSwiaWF0IjoxNDUzMTcwNjgzfQ.9XZ0qWYpFfMhP4vSvEDnAXUvOv03N6wuNhfFabY-LH0

*/

var SECRET="r8Kykut0XJjRDWnJRfgHXiIshQYA7suKRVjI6gDi";

var uid="mark";

// No need to change following
var FirebaseTokenGenerator = require("firebase-token-generator");
var tokenGenerator = new FirebaseTokenGenerator(SECRET);
var token = tokenGenerator.createToken({ uid:uid, some: "arbitrary", data: "here" });
console.log("\n\n"+token);
