import React, { useState } from "react";
import "./App.css";

function getRandomChar(chars) {
  return chars[Math.floor(Math.random() * chars.length)];
}

function generatePassword(
  length,
  includeAlphabets,
  includeNumbers,
  includeSymbols
) {
  const alphabets = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const numbers = "0123456789";
  const symbols = "!@#$%^&*()_+[]{}|;:',.<>?/";

  let validChars = "";
  if (includeAlphabets) validChars += alphabets;
  if (includeNumbers) validChars += numbers;
  if (includeSymbols) validChars += symbols;

  if (!validChars) return "Please select at least one option.";

  let password = "";
  for (let i = 0; i < length; i++) {
    password += getRandomChar(validChars);
  }

  return password;
}

function App() {
  const [length, setLength] = useState(12);
  const [password, setPassword] = useState("");
  const [includeAlphabets, setIncludeAlphabets] = useState(true);
  const [includeNumbers, setIncludeNumbers] = useState(true);
  const [includeSymbols, setIncludeSymbols] = useState(true);
  const [copied, setCopied] = useState(false);

  const handleGenerate = () => {
    const newPassword = generatePassword(
      length,
      includeAlphabets,
      includeNumbers,
      includeSymbols
    );
    setPassword(newPassword);
    setCopied(false);
  };

  const handleCopy = () => {
    if (password) {
      navigator.clipboard.writeText(password);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    }
  };

  return (
    <div className="app-bg">
      <div className="password-card">
        <h1 className="app-title">
          Password Generator
        </h1>
        <p className="subtitle">Create strong, secure passwords instantly</p>
        <div className="input-group">
          <label className="label">Password Length</label>
          <input
            type="number"
            min="4"
            max="64"
            value={length}
            onChange={(e) => setLength(Number(e.target.value))}
            className="input"
          />
        </div>
        <div className="checkbox-group">
          <label className="checkbox-label">
            <input
              type="checkbox"
              checked={includeAlphabets}
              onChange={(e) => setIncludeAlphabets(e.target.checked)}
              className="checkbox"
            />
            <span>Alphabets</span>
          </label>
          <label className="checkbox-label">
            <input
              type="checkbox"
              checked={includeNumbers}
              onChange={(e) => setIncludeNumbers(e.target.checked)}
              className="checkbox"
            />
            <span>Numbers</span>
          </label>
          <label className="checkbox-label">
            <input
              type="checkbox"
              checked={includeSymbols}
              onChange={(e) => setIncludeSymbols(e.target.checked)}
              className="checkbox"
            />
            <span>Symbols</span>
          </label>
        </div>
        <button
          onClick={handleGenerate}
          className="generate-btn"
        >
          Generate Password
        </button>
        {password && (
          <div className="password-output-group">
            <div className="password-output">
              <span className="password-text">{password}</span>
              <button
                onClick={handleCopy}
                className="copy-btn"
                title={copied ? "Copied!" : "Copy to clipboard"}
                aria-label="Copy password"
              >
                {copied ? "✔" : "📋"}
              </button>
            </div>
            <span className={`copy-tooltip${copied ? ' show' : ''}`}>{copied ? 'Copied!' : ''}</span>
          </div>
        )}
      </div>
      <footer className="footer">
        &copy; {new Date().getFullYear()} My Password App — Secure. Simple. Fast.
      </footer>
    </div>
  );
}

export default App;
