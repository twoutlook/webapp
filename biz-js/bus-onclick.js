

    function showAnchor(){
      map.setCenter(initLatLng);

      // RESET ALL
      anchorCnt++; // it won't show info window again
      console.log("anchorCnt=" + anchorCnt);
      //
      // var rulX = urlFirebase + 'buslist';
      // var refList = new Firebase(rulX);
      // var cnt = 0;
      // refList.on("child_added", function (snapshot, prevChildKey) {
      //     var key = snapshot.key();
      //     // console.log("key=" + key);
      //     ref.child(key).off();
      // });
      initMap();
    }
