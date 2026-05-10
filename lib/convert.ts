type Mode = "sub" | "sup";

const SYMBOL_MAP: Record<string, string> = {
  // Greek lowercase
  alpha: "α",
  beta: "β",
  gamma: "γ",
  delta: "δ",
  epsilon: "ϵ",
  varepsilon: "ε",
  zeta: "ζ",
  eta: "η",
  theta: "θ",
  vartheta: "ϑ",
  iota: "ι",
  kappa: "κ",
  lambda: "λ",
  mu: "μ",
  nu: "ν",
  xi: "ξ",
  pi: "π",
  varpi: "ϖ",
  rho: "ρ",
  varrho: "ϱ",
  sigma: "σ",
  varsigma: "ς",
  tau: "τ",
  upsilon: "υ",
  phi: "ϕ",
  varphi: "φ",
  chi: "χ",
  psi: "ψ",
  omega: "ω",

  // Greek uppercase
  Gamma: "Γ",
  Delta: "Δ",
  Theta: "Θ",
  Lambda: "Λ",
  Xi: "Ξ",
  Pi: "Π",
  Sigma: "Σ",
  Upsilon: "Υ",
  Phi: "Φ",
  Psi: "Ψ",
  Omega: "Ω",

  // Binary operators
  pm: "±",
  mp: "∓",
  times: "×",
  div: "÷",
  cdot: "⋅",
  ast: "∗",
  star: "⋆",
  circ: "∘",
  bullet: "∙",
  oplus: "⊕",
  ominus: "⊖",
  otimes: "⊗",
  oslash: "⊘",
  odot: "⊙",
  cap: "∩",
  cup: "∪",
  sqcap: "⊓",
  sqcup: "⊔",
  vee: "∨",
  wedge: "∧",
  setminus: "∖",
  wr: "≀",

  // Relations
  le: "≤",
  leq: "≤",
  ge: "≥",
  geq: "≥",
  neq: "≠",
  ne: "≠",
  equiv: "≡",
  sim: "∼",
  simeq: "≃",
  cong: "≅",
  approx: "≈",
  propto: "∝",
  in: "∈",
  notin: "∉",
  ni: "∋",
  subset: "⊂",
  supset: "⊃",
  subseteq: "⊆",
  supseteq: "⊇",
  nsubseteq: "⊈",
  nsupseteq: "⊉",
  parallel: "∥",
  perp: "⊥",
  mid: "∣",
  models: "⊨",

  // Arrows
  leftarrow: "←",
  gets: "←",
  rightarrow: "→",
  to: "→",
  leftrightarrow: "↔",
  Leftarrow: "⇐",
  Rightarrow: "⇒",
  Leftrightarrow: "⇔",
  mapsto: "↦",
  uparrow: "↑",
  downarrow: "↓",
  updownarrow: "↕",
  nearrow: "↗",
  searrow: "↘",
  swarrow: "↙",
  nwarrow: "↖",
  longleftarrow: "⟵",
  longrightarrow: "⟶",
  longleftrightarrow: "⟷",
  Longleftarrow: "⟸",
  Longrightarrow: "⟹",
  Longleftrightarrow: "⟺",
  longmapsto: "⟼",

  // Logic and sets
  forall: "∀",
  exists: "∃",
  nexists: "∄",
  neg: "¬",
  land: "∧",
  lor: "∨",
  emptyset: "∅",
  varnothing: "∅",
  infty: "∞",

  // Common number sets
  RR: "ℝ",
  CC: "ℂ",
  NN: "ℕ",
  ZZ: "ℤ",
  partial: "∂",
  nabla: "∇",
  aleph: "ℵ",
  ell: "ℓ",
  hbar: "ℏ",
  Re: "ℜ",
  Im: "ℑ",
  wp: "℘",

  // Big operators
  sum: "∑",
  prod: "∏",
  coprod: "∐",
  int: "∫",
  iint: "∬",
  iiint: "∭",
  oint: "∮",
  bigcap: "⋂",
  bigcup: "⋃",
  bigvee: "⋁",
  bigwedge: "⋀",
  bigoplus: "⨁",
  bigotimes: "⨂",
  bigodot: "⨀",

  // Delimiters and punctuation-like symbols
  langle: "⟨",
  rangle: "⟩",
  lfloor: "⌊",
  rfloor: "⌋",
  lceil: "⌈",
  rceil: "⌉",
  colon: ":",
  ldots: "…",
  cdots: "⋯",
  vdots: "⋮",
  ddots: "⋱",

  // Common special symbols
  degree: "°",
  angle: "∠",
  measuredangle: "∡",
  triangle: "△",
  Box: "□",
  square: "□",
  Diamond: "◇",
  diamond: "⋄",
  top: "⊤",
  bot: "⊥",
  vdash: "⊢",
  dashv: "⊣",
};

const SUBSCRIPT_MAP: Record<string, string> = {
  "0": "₀",
  "1": "₁",
  "2": "₂",
  "3": "₃",
  "4": "₄",
  "5": "₅",
  "6": "₆",
  "7": "₇",
  "8": "₈",
  "9": "₉",
  a: "ₐ",
  e: "ₑ",
  h: "ₕ",
  i: "ᵢ",
  j: "ⱼ",
  k: "ₖ",
  l: "ₗ",
  m: "ₘ",
  n: "ₙ",
  o: "ₒ",
  p: "ₚ",
  r: "ᵣ",
  s: "ₛ",
  t: "ₜ",
  u: "ᵤ",
  v: "ᵥ",
  x: "ₓ",
  "+": "₊",
  "-": "₋",
};

const SUPERSCRIPT_MAP: Record<string, string> = {
  "0": "⁰",
  "1": "¹",
  "2": "²",
  "3": "³",
  "4": "⁴",
  "5": "⁵",
  "6": "⁶",
  "7": "⁷",
  "8": "⁸",
  "9": "⁹",
  a: "ᵃ",
  b: "ᵇ",
  c: "ᶜ",
  d: "ᵈ",
  e: "ᵉ",
  f: "ᶠ",
  g: "ᵍ",
  h: "ʰ",
  i: "ⁱ",
  j: "ʲ",
  k: "ᵏ",
  l: "ˡ",
  m: "ᵐ",
  n: "ⁿ",
  o: "ᵒ",
  p: "ᵖ",
  r: "ʳ",
  s: "ˢ",
  t: "ᵗ",
  u: "ᵘ",
  v: "ᵛ",
  w: "ʷ",
  x: "ˣ",
  y: "ʸ",
  z: "ᶻ",
  A: "ᴬ",
  B: "ᴮ",
  D: "ᴰ",
  E: "ᴱ",
  G: "ᴳ",
  H: "ᴴ",
  I: "ᴵ",
  J: "ᴶ",
  K: "ᴷ",
  L: "ᴸ",
  M: "ᴹ",
  N: "ᴺ",
  O: "ᴼ",
  P: "ᴾ",
  R: "ᴿ",
  T: "ᵀ",
  U: "ᵁ",
  V: "ⱽ",
  W: "ᵂ",
  "+": "⁺",
  "-": "⁻",
};

const ALLOWED_GROUP_CHAR = /^[A-Za-z0-9+-]$/;
const ALNUM_CHAR = /^[A-Za-z0-9]$/;

function isAsciiLetter(ch: string): boolean {
  const code = ch.charCodeAt(0);
  return (code >= 65 && code <= 90) || (code >= 97 && code <= 122);
}

function getMap(mode: Mode): Record<string, string> {
  return mode === "sub" ? SUBSCRIPT_MAP : SUPERSCRIPT_MAP;
}

function findClosingIndex(input: string, openIndex: number): number {
  const open = input[openIndex];
  const close = open === "(" ? ")" : "}";
  let depth = 0;
  for (let i = openIndex; i < input.length; i += 1) {
    const ch = input[i];
    if (ch === open) {
      depth += 1;
    } else if (ch === close) {
      depth -= 1;
      if (depth === 0) {
        return i;
      }
    }
  }
  return -1;
}

function convertGroup(content: string, mode: Mode): string | null {
  if (content.length === 0) {
    return null;
  }

  const map = getMap(mode);
  let converted = "";

  for (const ch of content) {
    if (!ALLOWED_GROUP_CHAR.test(ch)) {
      return null;
    }
    const next = map[ch];
    if (!next) {
      return null;
    }
    converted += next;
  }
  return converted;
}

function convertSingle(ch: string, mode: Mode): string | null {
  if (!ALNUM_CHAR.test(ch)) {
    return null;
  }
  const map = getMap(mode);
  const converted = map[ch];
  return converted === undefined ? null : converted;
}

export function convertSymbolWords(input: string): string {
  const padded = ` ${input} `;
  let out = "";
  let i = 0;
  let suppressLeadingSpace = false;

  while (i < padded.length) {
    const ch = padded[i];
    if (ch === " ") {
      const wordStart = i + 1;
      let wordEnd = wordStart;
      while (wordEnd < padded.length && isAsciiLetter(padded[wordEnd])) {
        wordEnd += 1;
      }

      if (wordEnd > wordStart && wordEnd < padded.length && padded[wordEnd] === " ") {
        const word = padded.slice(wordStart, wordEnd);
        const symbol = SYMBOL_MAP[word];
        if (symbol !== undefined) {
          out += symbol;
          i = wordEnd;
          suppressLeadingSpace = true;
          continue;
        }

        out += suppressLeadingSpace ? word : padded.slice(i, wordEnd);
        i = wordEnd;
        suppressLeadingSpace = false;
        continue;
      }

      if (suppressLeadingSpace) {
        suppressLeadingSpace = false;
        i += 1;
        continue;
      }
    }

    out += ch;
    suppressLeadingSpace = false;
    i += 1;
  }

  if (out.startsWith(" ")) {
    out = out.slice(1);
  }
  if (out.endsWith(" ")) {
    out = out.slice(0, -1);
  }
  return out;
}

function convertScripts(input: string): string {
  let out = "";
  let i = 0;

  while (i < input.length) {
    const marker = input[i];
    if (marker !== "_" && marker !== "^") {
      out += marker;
      i += 1;
      continue;
    }

    const mode: Mode = marker === "_" ? "sub" : "sup";
    const nextIndex = i + 1;
    if (nextIndex >= input.length) {
      out += marker;
      i += 1;
      continue;
    }

    const next = input[nextIndex];
    if (next === "{" || next === "(") {
      const closeIndex = findClosingIndex(input, nextIndex);
      if (closeIndex === -1) {
        out += marker;
        i += 1;
        continue;
      }

      const content = input.slice(nextIndex + 1, closeIndex);
      const converted = convertGroup(content, mode);
      if (converted === null) {
        out += input.slice(i, closeIndex + 1);
      } else {
        out += converted;
      }
      i = closeIndex + 1;
      continue;
    }

    const converted = convertSingle(next, mode);
    if (converted === null) {
      out += marker;
      i += 1;
      continue;
    }

    out += converted;
    i += 2;
  }

  return out;
}

export function convertMathText(input: string): string {
  const scriptConverted = convertScripts(input);
  return convertSymbolWords(scriptConverted);
}
