import React from "react";
import "./modal.css";
import { useHeight } from "../../hooks/useHeight";
import { AiOutlineCloseCircle } from "react-icons/ai";

function Modal({ letters, guessed, gameState, restart, onExit, type }) {
  const { height } = useHeight();

  return (
    <div style={{ height: height }} className="modal">
      <div className="modal-overlay" onClick={onExit}></div>
      <div className="modal-body">
        <div className="close-button" onClick={onExit}>
          <AiOutlineCloseCircle />
        </div>
        {type === "gameEnd" && (
          <div className="modal-game-end">
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
        )}
        {type === "instructions" && (
          <div className="modal-instructions">
            <h3>How to play</h3>
            <p>Guess the word in 6 tries.</p>
            <p>
              Each letter you guess will be highlighted in a certain color to
              signify whether or not it is in the word, or if it is the correct
              position.
            </p>
            <p>
              <span className="not-in-word instructions-color">Grey</span> means
              the letter is not in the word.
            </p>
            <p>
              <span className="in-word instructions-color">Yellow</span> means
              the letter is in the word but not in the correct position.
            </p>
            <p>
              <span className="in-position instructions-color">Green</span>{" "}
              means the letter is in the word and in the correct position.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default Modal;
