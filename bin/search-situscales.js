#!/usr/bin/env node
"use strict";
var situ_scale_1 = require("situscale");

situ_scale_1.SituScale.searchScales(function (scale) {
    console.log("Discovered SITU scale with address: ", scale.address);
    scale.callback = function (weight) {
        console.log(weight, "Received from scale with address", scale.address);
    };
});
