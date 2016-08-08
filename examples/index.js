var SituScale = require('../index.js');

var address = "C6:E3:C7:5E:FD:FC";
var scale = new SituScale(address);

var weight = scale.getWeight(function(weight){
  console.log(weight);
});

// Stop weight notifications after 3 seconds
setTimeout(function(){
  scale.stopNotifications();
  console.log('stopped notifications');

  // Start weight notifications after another 3 seconds
  setTimeout(function(){
    scale.startNotifications();
    console.log('started notifications');

    // Disconnect device after another 3 seconds
    setTimeout(function(){
      scale.disconnect();
      console.log('disconnected');
    }, 3000);
  }, 3000);
}, 3000);
