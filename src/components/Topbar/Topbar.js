import React from "react";
import "./topbar.css";
import { FiAlertCircle } from "react-icons/fi";
import { AiOutlineQuestionCircle } from "react-icons/ai";

function Topbar({ gameState, guessed, onClickLeft, onClickRight }) {
  return (
    <div className="top-bar">
      <div className="top-bar-left">
        <AiOutlineQuestionCircle onClick={() => onClickLeft(true)} />
      </div>
      <div className="top-bar-middle">
        <h1>Merge</h1>
      </div>
      <div className="top-bar-right">
        {gameState !== "active" && (
          <FiAlertCircle
            onClick={() => onClickRight(guessed[guessed.length - 1])}
          />
        )}
      </div>
    </div>
  );
}

export default Topbar;
