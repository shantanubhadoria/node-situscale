"use strict";
var situscale_1 = require("./situscale");
situscale_1.SituScale.searchScales(function (scale) {
    console.log("Discovered SITU scale with address: ", scale);
    scale.callback = function (weight) {
        console.log(weight, "Received from scale with address", scale.address);
    };
});
