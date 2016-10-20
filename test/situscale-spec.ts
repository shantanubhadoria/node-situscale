
import { SituScale } from "../src";
import * as chai from "chai";
import {} from "mocha";

const expect = chai.expect;

describe("greeter", () => {
  it("should greet with message", () => {
    const situScale = new SituScale();
    expect(situScale).to.be.instanceOf(SituScale);
  });
});
