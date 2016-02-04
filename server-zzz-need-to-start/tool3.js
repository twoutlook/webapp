var     lazy    = require("lazy"),
        fs  = require("fs");

 new lazy(fs.createReadStream('to-kill.txt'))
     .lines
     .forEach(function(line){
        //  console.log(line.toString());
         var key=line.toString();
         key=key.substr(1,100);
         //http://stackoverflow.com/questions/10805125/how-to-remove-all-line-breaks-from-a-string
         key=key.replace(/(\r\n|\n|\r)/gm,"");
        //  var urlX=""+key;
         var str='killBus("'+key+'");';
        //  console.log(key);
         console.log(str);

     }
 );
