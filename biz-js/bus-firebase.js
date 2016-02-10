// var urlFirebase = "https://bus-v2-0128.firebaseio.com/";
var urlFirebase = "https://bus-0119.firebaseio.com/";
var ref = new Firebase(urlFirebase);
var refRoutes = ref.child("routesv5/");//路線上的站牌$ node server-tasks/b1
var refBuslist = ref.child("buslistv6/");//有回報公車所屬路線  $ node server-tasks/b2

//https://bus-0119.firebaseio.com/buslistv8-doc3  --- for 3 dots 目前沒有使用

//buslistv9-doc' + x    --- for 30 dots 車子三十個紅點數據 $ node server-tasks/batch-buslistv9.js
