import React from "react";
import "./modal.css";
import { useHeight } from "../../hooks/useHeight";

function Modal({ letters, guessed, gameState, restart, onClickOverlay }) {
  const { height } = useHeight();

  return (
    <div style={{ height: height }} className="modal">
      <div className="modal-overlay" onClick={onClickOverlay}></div>
      <div className="modal-body">
        <h3>{gameState === "win" ? "Correct" : "Out of turns"}</h3>
        <p>The word was {letters.join("")}</p>
        <p>
          {gameState === "win"
            ? `You guessed it in ${guessed.length} ${
                guessed.length === 1 ? "turn" : "turns"
              }`
            : "You ran out of turns"}
        </p>
        <button onClick={() => restart()} className="restart-button">
          Play again?
        </button>
      </div>
    </div>
  );
}

export default Modal;
