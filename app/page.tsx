"use client";

import { type ChangeEvent, useMemo, useRef, useState } from "react";
import { HelpModal } from "./components/HelpModal";
import { convertMathText } from "../lib/convert";

export default function HomePage() {
  const [input, setInput] = useState("");
  const [copied, setCopied] = useState(false);
  const [isHelpOpen, setIsHelpOpen] = useState(false);
  const outputRef = useRef<HTMLTextAreaElement>(null);
  const output = useMemo(() => convertMathText(input), [input]);

  const handleInputChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setInput(event.currentTarget.value);
  };

  const handleCopy = async () => {
    try {
      const clipboard = navigator.clipboard;
      if (clipboard && typeof clipboard.writeText === "function") {
        await clipboard.writeText(output);
      } else if (outputRef.current) {
        outputRef.current.focus();
        outputRef.current.select();
        document.execCommand("copy");
      }
      setCopied(true);
      setTimeout(() => setCopied(false), 1200);
    } catch {
      setCopied(false);
    }
  };

  return (
    <main className="container">
      <div className="panel">
        <div className="panelHeader">
          <label htmlFor="input">入力</label>
          <button
            type="button"
            className="helpToggle"
            onClick={() => setIsHelpOpen(true)}
            aria-expanded={isHelpOpen}
            aria-haspopup="dialog"
            aria-controls="help-modal-title"
          >
            使い方
          </button>
        </div>
        <textarea
          id="input"
          value={input}
          onChange={handleInputChange}
          placeholder="ここにテキストを入力"
          spellCheck={false}
        />
      </div>

      <div className="panel">
        <div className="panelHeader">
          <label htmlFor="output">出力</label>
          <span className="panelHeaderSpacer" aria-hidden="true">
            使い方
          </span>
        </div>
        <textarea
          id="output"
          ref={outputRef}
          value={output}
          readOnly
          placeholder="変換結果がここに表示されます"
          spellCheck={false}
        />
        <div className="outputActions">
          <button type="button" onClick={handleCopy}>
            {copied ? "コピー済み" : "コピー"}
          </button>
        </div>
      </div>

      {isHelpOpen && <HelpModal onClose={() => setIsHelpOpen(false)} />}
    </main>
  );
}
