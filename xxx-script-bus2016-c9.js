var app = angular.module("sampleApp", ["firebase"]);

app.controller("SampleCtrl", function($scope, $firebaseArray) {
  var ref = new Firebase("https://bus2016-c9.firebaseio.com/");

  var refList=ref.child('list');
  $scope.messages = $firebaseArray(refList);

  // $scope.messages =[
  //   {carNum:'001-FY'},
  //   {carNum:'001-FP'},
  //   {carNum:'002-FQ'},
  //
  // ];

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

  // $scope.messages2=null;
  var day1 = new Date("2016-01-18");
  for (var i=1;i<366;i++){
    var dat=day1.addDays(i);

    // console.log(formatDate(dat));
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

//http://stackoverflow.com/questions/237104/array-containsobj-in-javascript
  function contains(a, obj) {
      for (var i = 0; i < a.length; i++) {
          if (a[i] === obj) {
              return true;
          }
      }
      return false;
  }


  $scope.step1 = function (selectCar) {
    console.log("???...DOING step1, selectCar =>"+selectCar);
     $scope.ddlDate={};
      var refCar=ref.child(selectCar);
      var ddlDate={};

      $scope.messages2=[];// reset this array
      refCar.once("value", function(snapshot) {
        // The callback function will get called twice, once for "fred" and once for "barney"
        snapshot.forEach(function(childSnapshot) {
        // key will be "fred" the first time and "barney" the second time
        var key = childSnapshot.key();
        // childData will be the actual contents of the child
        var childData = childSnapshot.val();
        // var desiredDate=childData.dt.substr(0,13); // FOR TESTING 2016-01-18 08
        var desiredDate=childData.dt.substr(0,10); // FOR PRODUCTION 2016-01-18
        // var temp={carNum:desiredDate};
        var tempDate={carNum:desiredDate};
        console.log(tempDate);
        var dateCnt=$scope.messages2.length;
        console.log($scope.messages2.length);

        var flag=false;
        for (var i = 0; i < $scope.messages2; i++) {
          console.log(i+" of "+$scope.messages2.length);
          console.log(i+" is "+$scope.messages2[i].carNum);

            if ($scope.messages2[i].carNum == tempDate.carNum) {
                flag=true;
            }
        }
        console.log("flag="+flag);
        if (flag===false){
          //

          $scope.messages2.push(tempDate);
        }


        // if contains($scope.messages2,temp){
        //   // exist, not to repeat
        // }else{
        //   $scope.messages2.push(tempDate); // NOT GOOD ENOUGH, REPEAT DAYS
        // }


        // console.log("desiredDate "+desiredDate);
        //
        // ddlDate[desiredDate]=true;
        // // console.log(key);
        // // console.log("xxx no repeat date here: "+ddlDate);
        // // console.log(ddlDate);
        //
        // for(var i = 0; i < ddlDate.length; i++) {
        //   var obj = ddlDate[i];
        //   console.log("============");
        //   console.log(obj);
        //   console.log(ddlDate);
        //
        // }
        //
        //   console.log("??? id "+obj.id);
        //   var temp={carNum:obj.id};
        //   // var temp={carHour:hr};
        //   $scope.messages2.push(temp);
        // }



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

function getEndStr(startStr) {
  console.log("...checkDdl");
}


  $scope.results={};
  $scope.check = function (selectCar,selectDate,selectHour) {
      console.log("===============DOING  =>"+selectCar+" "+selectDate+" "+selectHour);
//https://www.firebase.com/docs/web/libraries/angular/guide/synchronized-arrays.html

      var ref2=ref.child(selectCar);

      // var query=ref2.orderByChild("dt").startAt(selectDate+" "+selectHour).on("child_added", function(snapshot) {
      var startStr=selectDate+" "+selectHour;
      var endStr=startStr+":59:59";

    //  var endStr="2016-01-17 21"
      console.log("startStr="+startStr);
        console.log("endStr="+endStr);
      var query=ref2.orderByChild("dt").startAt(selectDate+" "+selectHour).endAt(endStr);
      // var query=ref2.orderByChild("dt").startAt(selectDate+" "+selectHour);

      $scope.results = $firebaseArray(query);



  }





});
