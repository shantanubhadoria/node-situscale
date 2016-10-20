import { SituScale } from "./situscale";

/* tslint:disable:no-console */
SituScale.searchScales((scale) => {
  console.log("Discovered SITU scale with address: ", scale);
  scale.callback = (weight) => {
    console.log(weight, "Received from scale with address", scale.address);
  };
});
/* tslint:enable:no-console */
