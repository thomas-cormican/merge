import React from "react";
import "./topbar.css";
import { FiAlertCircle } from "react-icons/fi";

function Topbar({ gameState, guessed, onClick }) {
  return (
    <div className="top-bar">
      <div className="top-bar-left"></div>
      <div className="top-bar-middle">
        <h1>Merge</h1>
      </div>
      <div className="top-bar-right">
        {gameState !== "active" && (
          <FiAlertCircle onClick={() => onClick(guessed[guessed.length - 1])} />
        )}
      </div>
    </div>
  );
}

export default Topbar;
