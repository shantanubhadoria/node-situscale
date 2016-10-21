import { SituScale } from "./situ-scale";

/* tslint:disable:no-console */
SituScale.searchScales((scale) => {
  console.log("Discovered SITU scale with address: ", scale.address);
  scale.callback = (weight) => {
    console.log(weight, "Received from scale with address", scale.address);
  };
});
/* tslint:enable:no-console */
