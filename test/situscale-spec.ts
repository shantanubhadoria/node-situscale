
import { SituScale } from "../src";
import * as chai from "chai";
import {} from "mocha";

const expect = chai.expect;

describe("situscale", () => {
  it("should return a instance of situscale", () => {
    const situScale = new SituScale("friend");
    expect(situScale).to.be.instanceOf(SituScale);
  });
});
