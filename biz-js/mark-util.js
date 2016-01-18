/*

http://taipeicity.github.io/traffic_realtime/

BUSDATA	定時車機資訊	每分鐘	http://data.taipei/bus/BUSDATA

https://drive.google.com/file/d/0BzL9ldn5Fg6dcVZ3eUgybkdiTXc/view

{"EssentialInfo":{"Location":{"name":"臺北市","CenterName":"臺北市動態資訊中心"},
"UpdateTime":"2016-01-18 19:37:47","CoordinateSystem":"WGS84"},
"BusInfo":[{"ProviderID":1100.0,"StationID":11150.0,"BusID":"337-FP","CarType":"1",
"CarID":222233738.0,"DutyStatus":"1","BusStatus":"0","RouteID":111520.0,"GoBack":"1",
"Longitude":121.568413,"Latitude":25.027451,"Speed":18.268129,"Azimuth":180.479996,
"DataTime":"\/Date(1453117056000+0800)\/"}

http://www.onlineconversion.com/unix_time.htm
Mon, 18 Jan 2016 11:37:36 GMT

"\/Date(1453117056000+0800)\/"
2016-01-18 19:37:36

http://blog.stevenlevithan.com/archives/date-time-format
http://stevenlevithan.com/assets/misc/date.format.js

*/
function mark_convert_BUSDATA_DataTime(dt){
  // 1.去頭去尾,轉成數字
  // dt=dt.replace(/\/Date\(/, "").replace(/\+0800\)\//, ""); //單獨測試是這樣沒錯,但是透過 Firebase 再取下就不一樣,
  // \/Date(1453089388000+0800)\/
  // \1453089388000+0800)\/


   dt=dt.replace(/\\\/Date\(/, "").replace(/\+0800\)\\\//, ""); //單獨測試是這樣沒錯,但是透過 Firebase 再取下就不一樣


  // console.log(dt);
  // dt=parseInt(dt)+ 28800000      ;//+8小時 8*60*60*1000=28800000
  dt=parseInt(dt)     ;//+8小時 8*60*60*1000=28800000

  dt=new Date(dt);

  // 2.引用  Steven Levithan 的  Date.prototype.format
  // isoDate:        "yyyy-mm-dd",
	// isoTime:        "HH:MM:ss",
  return dt.format("yyyy-mm-dd HH:MM:ss");
}
