"use client";

import { useEffect } from "react";

type HelpModalProps = {
  onClose: () => void;
};

export function HelpModal({ onClose }: HelpModalProps) {
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = previousOverflow;
    };
  }, [onClose]);

  return (
    <div className="helpModalOverlay" onClick={onClose}>
      <section
        className="helpModal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="help-modal-title"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="helpModalHeader">
          <h2 id="help-modal-title">使い方</h2>
          <button type="button" className="helpModalClose" onClick={onClose} aria-label="使い方を閉じる">
            閉じる
          </button>
        </div>

        <div className="helpModalBody">
          <p>
            <code>D_n</code> → <code>Dₙ</code>
            <br />
            <code>x^2</code> → <code>x²</code>
            <br />
            <code>a_{"{12n}"}</code> → <code>a₁₂ₙ</code>
            <br />
            <code>r^(-1)</code> → <code>r⁻¹</code>
          </p>

          <p>
            <code>alpha + beta = gamma</code> → <code>α+β=γ</code>
            <br />
            <code>forall x in RR</code> → <code>∀x∈ℝ</code>
          </p>

          <p>
            変換したくない部分は <code>"</code> で囲みます。
            <br />
            <code>a in "in" a</code> → <code>a∈in a</code>
            <br />
            <code>"x^2"</code> → <code>x^2</code>
          </p>

          <p>
            <code>"</code> を出したいときは、引用内で <code>""</code> と書きます。
            <br />
            <code>"he said ""alpha"""</code> → <code>he said "alpha"</code>
          </p>
        </div>
      </section>
    </div>
  );
}
