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

test("symbol words are converted and surrounding spaces are removed", () => {
  assert.equal(convertMathText("alpha + beta = gamma"), "α+β=γ");
  assert.equal(convertMathText("forall x in RR exists y in CC"), "∀x∈ℝ∃y∈ℂ");
  assert.equal(convertMathText("alpha beta"), "αβ");
  assert.equal(convertMathText("x in A"), "x∈A");
});

test("symbol words keep original text when not in map", () => {
  assert.equal(convertMathText("hello world"), "hello world");
  assert.equal(convertMathText("hello\nworld"), "hello\nworld");
  assert.equal(convertMathText("alpha+beta"), "alpha+beta");
});

test("symbol words support whitespace boundaries and keep newlines", () => {
  assert.equal(convertMathText("alpha\nbeta"), "α\nβ");
  assert.equal(convertMathText("alpha\n+ beta"), "α\n+β");
  assert.equal(convertMathText("forall x in RR\nexists y in CC"), "∀x∈ℝ\n∃y∈ℂ");
  assert.equal(convertMathText("alpha\tbeta"), "αβ");
});

test("symbol words and script conversion coexist", () => {
  assert.equal(convertMathText("x^(n+1) in RR"), "xⁿ⁺¹∈ℝ");
  assert.equal(convertMathText("D_n in RR"), "Dₙ∈ℝ");
});
