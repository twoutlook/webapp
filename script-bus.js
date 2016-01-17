var app = angular.module("sampleApp", ["firebase"]);

app.controller("SampleCtrl", function($scope, $firebaseArray) {
  var ref = new Firebase("https://bus2016.firebaseio.com/");

  //$scope.messages = $firebaseArray(ref);

  $scope.messages =[
    {carNum:'001-FY'},
    {carNum:'001-FP'},
    {carNum:'002-FQ'},

  ];

    $scope.messages2 =[

    {carNum:'2016-01-17'},
    {carNum:'2016-01-18'},
  ];

//http://stackoverflow.com/questions/563406/add-days-to-datetime
  Date.prototype.addDays = function(days)
  {
      var dat = new Date(this.valueOf());
      dat.setDate(dat.getDate() + days);
      return dat;
  }

  //http://stackoverflow.com/questions/23593052/format-javascript-date-to-yyyy-mm-dd
  function formatDate(date) {
    var d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;

    return [year, month, day].join('-');
}
  console.log("...DOING   $scope.messages2");
  // $scope.messages2=null;
  var day1 = new Date("2016-01-18");
  for (var i=0;i<366;i++){
    var dat=day1.addDays(i);

    console.log(formatDate(dat));
    var dat=formatDate(dat);
    var temp={carNum:dat};
    // var temp={carHour:hr};
    $scope.messages2.push(temp);
  }




  $scope.ddlHour=[
    {carHour:'00'},
    {carHour:'01'},
    {carHour:'02'}
  ];
  // console.log("...DOING   $scope.ddlHour");
  for (var i=3;i<24;i++){
    // console.log("i="+i);
    var hr=i;
    if (i<10){
      hr="0"+i;
    }
    var temp={carHour:hr};
    $scope.ddlHour.push(temp);
  }





  $scope.step1 = function (selectCar) {
    console.log("selectCar =>"+selectCar);
     $scope.ddlDate={};
      var refCar=ref.child(selectCar);
      var ddlDate={};
      refCar.once("value", function(snapshot) {
        // The callback function will get called twice, once for "fred" and once for "barney"
        snapshot.forEach(function(childSnapshot) {
        // key will be "fred" the first time and "barney" the second time
        var key = childSnapshot.key();
        // childData will be the actual contents of the child
        var childData = childSnapshot.val();
        ddlDate[childData.dt.substr(0,13)]=true;
        // console.log(key);
        console.log(ddlDate);



    //    $scope.ddlDate=checkDdl(ddlDate);
        // console.log(childData);

      });

    });
  }



//
function logArrayElements(element, index, array) {
  console.log('a[' + index + '] = ' + element);
}
function checkDdl(obj) {
  console.log("...checkDdl");
  var jsonArr=[];
  for (var key in obj){
    console.log(key+" =>"+obj[key]);
    jsonArr.push({dt:key});

  }
   console.log("====="+JSON.stringify(jsonArr));
  return jsonArr
}


  $scope.results={};
  $scope.check = function (selectCar,selectDate,selectHour) {
    console.log("DOING  =>"+selectCar+" "+selectDate+" "+selectHour);


      var ref2=ref.child(selectCar);
        $scope.results = $firebaseArray(ref2);
  }





});
