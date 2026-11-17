import test from "node:test";
import assert from "node:assert/strict";
import {
  getNumericHeight,
  getNumericWeight,
  compareValues,
  getSortValue,
} from "../helpers.js";

test("getNumericHeight parses centimeters and meters accurately", () => {
  assert.equal(getNumericHeight(["6'2", "188 cm"]), 188);
  assert.equal(getNumericHeight(["205'", "62.5 meters"]), 6250);
  assert.equal(getNumericHeight(["-", "0 cm"]), null);
  assert.equal(getNumericHeight(["-", "-"]), null);
  assert.equal(getNumericHeight(null), null);
});

test("getNumericWeight parses kilograms and tons accurately", () => {
  assert.equal(getNumericWeight(["210 lb", "95 kg"]), 95);
  assert.equal(getNumericWeight(["18,000 lb", "9 tons"]), 9000);
  assert.equal(getNumericWeight(["200,000 tons", "90,000 tons"]), 90000000);
  assert.equal(getNumericWeight(["- lb", "0 kg"]), null);
  assert.equal(getNumericWeight(["-", "-"]), null);
  assert.equal(getNumericWeight([]), null);
});

test("compareValues always sorts missing values last in both directions", () => {
  assert.ok(compareValues(null, 50, true, true) > 0);
  assert.ok(compareValues(null, 50, false, true) > 0);
  assert.ok(compareValues("-", "Batman", true, false) > 0);
  assert.ok(compareValues("-", "Batman", false, false) > 0);
  assert.ok(compareValues("Batman", "", true, false) < 0);
  assert.equal(compareValues(null, "-", true, false), 0);
});

test("compareValues sorts numeric and string values in ascending and descending order", () => {
  assert.ok(compareValues(78, 100, true, true) < 0);
  assert.ok(compareValues(78, 100, false, true) > 0);
  assert.ok(compareValues("A-Bomb", "Batman", true, false) < 0);
  assert.ok(compareValues("A-Bomb", "Batman", false, false) > 0);
});

test("getSortValue resolves nested fields and unit conversions", () => {
  const hero = {
    name: "Fin Fang Foom",
    biography: { fullName: "Fin Fang Foom" },
    powerstats: { strength: 100 },
    appearance: {
      height: ["32'0", "975 cm"],
      weight: ["18 tons", "16 tons"],
    },
  };

  assert.equal(getSortValue(hero, "name"), "Fin Fang Foom");
  assert.equal(getSortValue(hero, "biography.fullName"), "Fin Fang Foom");
  assert.equal(getSortValue(hero, "powerstats.strength"), 100);
  assert.equal(getSortValue(hero, "appearance.height"), 975);
  assert.equal(getSortValue(hero, "appearance.weight"), 16000);
  assert.equal(getSortValue({}, "appearance.height"), null);
  assert.equal(getSortValue(null, "name"), null);
});

