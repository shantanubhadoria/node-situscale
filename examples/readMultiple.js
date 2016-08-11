// readWeight.js
var SituScale = require('../index.js');

var scale = new SituScale();

scale.getAllWeights(function(weight, scale) {
  console.log("Scale with address: " + scale.address + ' notified weight of ' + weight + ' gms.');
});
