import { useState } from "react";

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&family=DM+Mono:wght@400;500&display=swap');

  * { box-sizing: border-box; margin: 0; padding: 0; }

  body {
    min-height: 100vh;
    background: #f5f2ed;
    display: flex;
    align-items: center;
    justify-content: center;
    font-family: 'DM Mono', monospace;
  }

  .wrapper {
    width: 100%;
    max-width: 560px;
    padding: 0 2rem;
  }

  .label {
    font-family: 'DM Mono', monospace;
    font-size: 11px;
    letter-spacing: 0.18em;
    text-transform: uppercase;
    color: #999;
    margin-bottom: 12px;
    display: block;
  }

  .input-row {
    position: relative;
    border-bottom: 1px solid #d8d3cb;
    transition: border-color 0.3s;
  }

  .input-row.focused {
    border-color: #e05c2a;
  }

  .input {
    width: 100%;
    background: transparent;
    border: none;
    outline: none;
    font-family: 'DM Mono', monospace;
    font-size: 22px;
    color: #1a1a1a;
    padding: 14px 0;
    caret-color: #e05c2a;
  }

  .input::placeholder {
    color: #ccc;
  }

  .cursor-bar {
    position: absolute;
    right: 0;
    top: 50%;
    transform: translateY(-50%);
    width: 2px;
    height: 22px;
    background: #e05c2a;
    transition: opacity 0.2s;
    animation: blink 1s step-end infinite;
  }

  .input-row.focused .cursor-bar {
    opacity: 1;
  }

  @keyframes blink {
    0%, 100% { opacity: 1; }
    50% { opacity: 0; }
  }

  .preview-area {
    margin-top: 64px;
    min-height: 120px;
    display: flex;
    align-items: flex-end;
  }

  .display-name {
    font-family: 'DM Serif Display', serif;
    font-size: clamp(42px, 10vw, 80px);
    color: #1a1a1a;
    line-height: 1;
    letter-spacing: -0.02em;
    transition: opacity 0.15s;
    word-break: break-word;
  }

  .display-name.empty {
    font-family: 'DM Serif Display', serif;
    font-style: italic;
    color: #d8d3cb;
    font-size: clamp(28px, 6vw, 48px);
    user-select: none;
  }

  .display-name span {
    display: inline-block;
    animation: slideUp 0.18s cubic-bezier(0.22, 1, 0.36, 1) both;
  }

  @keyframes slideUp {
    from { opacity: 0; transform: translateY(10px); }
    to   { opacity: 1; transform: translateY(0); }
  }

  .accent-line {
    margin-top: 16px;
    height: 2px;
    background: #e05c2a;
    transform-origin: left;
    transform: scaleX(0);
    transition: transform 0.4s cubic-bezier(0.22, 1, 0.36, 1);
  }

  .accent-line.visible {
    transform: scaleX(1);
  }
`;

export default function NameInput() {
  const [name, setName] = useState("");
  const [focused, setFocused] = useState(false);

  return (
    <>
      <style>{styles}</style>
      <div className="wrapper">
        <label className="label" htmlFor="name-field">Enter your name</label>

        <div className={`input-row ${focused ? "focused" : ""}`}>
          <input
            id="name-field"
            className="input"
            type="text"
            placeholder="type here…"
            value={name}
            autoComplete="off"
            spellCheck={false}
            onChange={(e) => setName(e.target.value)}
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
          />
        </div>

        <div className="preview-area">
          {name.trim() ? (
            <div>
              <div className="display-name" key={name}>
                {name.split("").map((char, i) => (
                  <span key={`${char}-${i}`} style={{ animationDelay: `${i * 0.015}s` }}>
                    {char === " " ? "\u00A0" : char}
                  </span>
                ))}
              </div>
              <div className="accent-line visible" />
            </div>
          ) : (
            <div>
              <div className="display-name empty">your name appears here</div>
              <div className="accent-line" />
            </div>
          )}
        </div>
      </div>
    </>
  );
}