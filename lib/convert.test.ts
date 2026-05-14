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
  assert.equal(convertMathText("a in a"), "a∈a");
  assert.equal(convertMathText("a in  a"), "a∈ a");
  assert.equal(convertMathText("a  in a"), "a ∈a");
  assert.equal(convertMathText("a  in  a"), "a ∈ a");
  assert.equal(convertMathText("alpha  +  beta"), "α + β");
});

test("symbol words keep original text when not in map", () => {
  assert.equal(convertMathText("hello world"), "hello world");
  assert.equal(convertMathText("hello\nworld"), "hello\nworld");
  assert.equal(convertMathText("alpha+beta"), "alpha+beta");
});

test("symbol words support whitespace boundaries and keep newlines", () => {
  assert.equal(convertMathText("alpha\nbeta"), "α\nβ");
  assert.equal(convertMathText("alpha\n+ beta"), "α\n+β");
  assert.equal(convertMathText("alpha \n beta"), "α\nβ");
  assert.equal(convertMathText("forall x in RR\nexists y in CC"), "∀x∈ℝ\n∃y∈ℂ");
  assert.equal(convertMathText("alpha\tbeta"), "αβ");
});

test("symbol words and script conversion coexist", () => {
  assert.equal(convertMathText("x^(n+1) in RR"), "xⁿ⁺¹∈ℝ");
  assert.equal(convertMathText("D_n in RR"), "Dₙ∈ℝ");
});

test("double-quoted ranges are fully escaped and quotes are removed", () => {
  assert.equal(convertMathText("\"alpha\""), "alpha");
  assert.equal(convertMathText("\"x^2\""), "x^2");
  assert.equal(convertMathText("\"D_n\""), "D_n");
  assert.equal(convertMathText("\"forall x in RR\""), "forall x in RR");
  assert.equal(convertMathText("\"he said \"\"alpha\"\"\""), "he said \"alpha\"");
  assert.equal(convertMathText("\"quote: \"\"\""), "quote: \"");
});

test("outside quotes conversion still works", () => {
  assert.equal(convertMathText("alpha"), "α");
  assert.equal(convertMathText("x^2"), "x²");
  assert.equal(convertMathText("D_n"), "Dₙ");
  assert.equal(convertMathText("forall x in RR"), "∀x∈ℝ");
});

test("quoted and unquoted segments can be mixed", () => {
  assert.equal(convertMathText("a in \"in\" a"), "a∈in a");
  assert.equal(convertMathText("\"alpha\" + beta"), "alpha+β");
  assert.equal(convertMathText("alpha + \"beta\" = gamma"), "α+beta=γ");
  assert.equal(convertMathText("forall x in \"RR\""), "∀x∈RR");
  assert.equal(convertMathText("\"forall x in RR\" and x in RR"), "forall x in RR and x∈ℝ");
  assert.equal(convertMathText("D_n = \"D_n\""), "Dₙ = D_n");
  assert.equal(convertMathText("x^2 = \"x^2\""), "x² = x^2");
});

test("quoted segment preserves internal spaces", () => {
  assert.equal(convertMathText("alpha \"  beta  \" gamma"), "α  beta  γ");
  assert.equal(convertMathText("alpha \" + beta = \" gamma"), "α + beta = γ");
});

test("unclosed and empty quotes", () => {
  assert.equal(convertMathText("alpha \"beta gamma"), "αbeta gamma");
  assert.equal(convertMathText("x^2 \"D_n alpha"), "x²D_n alpha");
  assert.equal(convertMathText("alpha \"\" beta"), "αβ");
  assert.equal(convertMathText("a \"\" in a"), "a∈a");
  assert.equal(convertMathText("alpha \"beta \"\" gamma"), "αbeta \" gamma");
});
