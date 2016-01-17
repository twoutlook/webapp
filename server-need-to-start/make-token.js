/*
eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ2IjowLCJkIjp7InVpZCI6Im1hcmsiLCJzb21lIjoiYXJiaXRyYXJ5IiwiZGF0YSI6ImhlcmUifSwiaWF
0IjoxNDUyOTQ5OTQ1fQ.68ett9WCwQzrY019k2vhLy_peiuGs-wf_Pantsu9htw
*/
//  ".write": "auth.uid == 'mark'"
// https://bus2016.firebaseio.com
var SECRET="rwAvX4APSO07SrtMiSpDblrxx45cZmHRXPhsevhb";
var uid="mark";

// No need to change following
var FirebaseTokenGenerator = require("firebase-token-generator");
var tokenGenerator = new FirebaseTokenGenerator(SECRET);
var token = tokenGenerator.createToken({ uid:uid, some: "arbitrary", data: "here" });
console.log("\n\n"+token);
