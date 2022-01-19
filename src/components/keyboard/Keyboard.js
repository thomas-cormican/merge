import React, { useEffect, useCallback } from "react";
import "./keyboard.css";
import { BsBackspace } from "react-icons/bs";
import Key from "./Key";

function Keyboard({ input, onKeyPress, onSubmit, guessed, letters, disabled }) {
  //handle clicks on virtual keyboard
  const handleClick = (e) => {
    if (disabled) {
      return;
    }
    if (e.target.value === "Enter") {
      onSubmit(e);
    } else if (e.target.value === "Backspace") {
      onKeyPress((prev) => prev.slice(0, prev.length - 1));
    } else {
      onKeyPress((prev) => {
        if (prev.length === 5) {
          return prev;
        } else {
          return [...prev, e.target.value];
        }
      });
    }
  };

  //handle keypresses
  const handleKeyPress = useCallback(
    (e) => {
      if (disabled) {
        return;
      }
      if (
        (e.keyCode >= 65 && e.keyCode <= 90) ||
        e.keyCode === 13 ||
        e.keyCode === 8
      ) {
        if (e.key === "Enter") {
          onSubmit(e);
        } else if (e.key === "Backspace") {
          onKeyPress((prev) => prev.slice(0, prev.length - 1));
        } else {
          onKeyPress((prev) => {
            if (prev.length === 5) {
              return prev;
            } else {
              return [...prev, e.key.toUpperCase()];
            }
          });
        }
      }
    },
    [disabled, onSubmit, onKeyPress]
  );

  useEffect(() => {
    document.addEventListener("keydown", handleKeyPress);

    return function cleanup() {
      document.removeEventListener("keydown", handleKeyPress);
    };
  }, [input, handleKeyPress]);

  const compareKey = (key) => {
    let value = 0;
    guessed.forEach((guess) => {
      if (guess.includes(key)) {
        guess.forEach((letter, index) => {
          if (letters.includes(key)) {
            if (letter === key && letter === letters[index]) {
              value += 100;
            } else {
              value++;
            }
          } else {
            value--;
          }
        });
      }
    });
    return value;
  };

  return (
    <div className="keyboard">
      <div className="keyboard-row">
        <Key value="Q" onClick={handleClick} compareKey={compareKey} />
        <Key value="W" onClick={handleClick} compareKey={compareKey} />
        <Key value="E" onClick={handleClick} compareKey={compareKey} />
        <Key value="R" onClick={handleClick} compareKey={compareKey} />
        <Key value="T" onClick={handleClick} compareKey={compareKey} />
        <Key value="Y" onClick={handleClick} compareKey={compareKey} />
        <Key value="U" onClick={handleClick} compareKey={compareKey} />
        <Key value="I" onClick={handleClick} compareKey={compareKey} />
        <Key value="O" onClick={handleClick} compareKey={compareKey} />
        <Key value="P" onClick={handleClick} compareKey={compareKey} />
      </div>
      <div className="keyboard-row">
        <Key value="A" onClick={handleClick} compareKey={compareKey} />
        <Key value="S" onClick={handleClick} compareKey={compareKey} />
        <Key value="D" onClick={handleClick} compareKey={compareKey} />
        <Key value="F" onClick={handleClick} compareKey={compareKey} />
        <Key value="G" onClick={handleClick} compareKey={compareKey} />
        <Key value="H" onClick={handleClick} compareKey={compareKey} />
        <Key value="J" onClick={handleClick} compareKey={compareKey} />
        <Key value="K" onClick={handleClick} compareKey={compareKey} />
        <Key value="L" onClick={handleClick} compareKey={compareKey} />
      </div>
      <div className="keyboard-row">
        <button onClick={handleClick} value="Enter" className="keyboard-key">
          Enter
        </button>
        <Key value="Z" onClick={handleClick} compareKey={compareKey} />
        <Key value="X" onClick={handleClick} compareKey={compareKey} />
        <Key value="C" onClick={handleClick} compareKey={compareKey} />
        <Key value="V" onClick={handleClick} compareKey={compareKey} />
        <Key value="B" onClick={handleClick} compareKey={compareKey} />
        <Key value="N" onClick={handleClick} compareKey={compareKey} />
        <Key value="M" onClick={handleClick} compareKey={compareKey} />
        <button
          onClick={handleClick}
          value="Backspace"
          className="keyboard-key backspace-key"
        >
          <BsBackspace />
        </button>
      </div>
    </div>
  );
}

export default Keyboard;
