import assert from "node:assert/strict";
import test from "node:test";
import { convertMathText } from "./convert.ts";

test("basic single-char conversion", () => {
  assert.equal(convertMathText("D_n"), "Dₙ");
  assert.equal(convertMathText("s^2"), "s²");
  assert.equal(convertMathText("x^T"), "xᵀ");
});

test("group conversion", () => {
  assert.equal(convertMathText("a_{12n}"), "a₁₂ₙ");
  assert.equal(convertMathText("x^(n+1)"), "xⁿ⁺¹");
  assert.equal(convertMathText("r^(-1)"), "r⁻¹");
});

test("invalid group remains unchanged", () => {
  assert.equal(convertMathText("R_{2π/n}"), "R_{2π/n}");
  assert.equal(convertMathText("a_(q)"), "a_(q)");
});

test("non-convertible single char remains unchanged", () => {
  assert.equal(convertMathText("a_q"), "a_q");
});

test("sample sentence", () => {
  const input = "D_nは正二面体群である。D_n={r,s | r^n=e, s^2=e, srs=r^(-1)}";
  const output = "Dₙは正二面体群である。Dₙ={r,s | rⁿ=e, s²=e, srs=r⁻¹}";
  assert.equal(convertMathText(input), output);
});
