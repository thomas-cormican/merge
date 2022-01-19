import React from "react";
import "./key.css";

function Key({ onClick, compareKey, value }) {
  return (
    <button
      onClick={onClick}
      value={value}
      className={`keyboard-key keyboard-key-letter ${
        compareKey(value) === 0
          ? ""
          : compareKey(value) >= 100
          ? "in-position"
          : compareKey(value) > 0
          ? "in-word"
          : "not-in-word"
      }`}
    >
      {value}
    </button>
  );
}

export default Key;
