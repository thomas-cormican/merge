import React from "react";
import "./gameboard.css";

const numberRows = 6;
const numberLetters = 5;

function Gameboard({ input, guessed, errorAnimation, compareLetters }) {
  return (
    <div className="game-board">
      {[...Array(numberRows)].map((e, rowIndex) => (
        <div
          key={`row-${rowIndex}`}
          className={`game-row ${
            guessed.length === rowIndex && errorAnimation && "shake"
          }`}
        >
          {[...Array(numberLetters)].map((e, letterIndex) => (
            <div
              key={`letter-${letterIndex}`}
              className={`game-tile ${
                guessed.length > rowIndex &&
                compareLetters(guessed[rowIndex][letterIndex], letterIndex)
              } ${
                guessed.length === rowIndex && input[letterIndex]
                  ? "active-input"
                  : ""
              }`}
            >
              {" "}
              <span className="tile-letter">
                {guessed.length === rowIndex && input[letterIndex]}
                {guessed.length > rowIndex && guessed[rowIndex][letterIndex]}
              </span>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}

export default Gameboard;
