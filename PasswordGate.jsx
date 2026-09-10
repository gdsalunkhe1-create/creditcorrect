import { useState } from "react";
import { INTERNAL_TOOL_PASSWORD } from "../config";

const SESSION_KEY = "cc_internal_unlocked";

export default function PasswordGate({ children }) {
  const [unlocked, setUnlocked] = useState(
    () => sessionStorage.getItem(SESSION_KEY) === "true"
  );
  const [input, setInput] = useState("");
  const [error, setError] = useState(false);

  function handleSubmit(e) {
    e.preventDefault();
    if (input === INTERNAL_TOOL_PASSWORD) {
      sessionStorage.setItem(SESSION_KEY, "true");
      setUnlocked(true);
    } else {
      setError(true);
    }
  }

  if (unlocked) return children;

  return (
    <div className="gate-screen">
      <form className="gate-box" onSubmit={handleSubmit}>
        <h2>Internal tool</h2>
        <p>Enter the password to continue.</p>
        <input
          type="password"
          value={input}
          onChange={(e) => {
            setInput(e.target.value);
            setError(false);
          }}
          autoFocus
        />
        {error && <div className="gate-error">Incorrect password.</div>}
        <button type="submit" className="btn-primary">Unlock</button>
      </form>
    </div>
  );
}
