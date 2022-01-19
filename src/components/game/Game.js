import React from "react";
import "./game.css";
import Keyboard from "../keyboard/Keyboard";
import Modal from "../modal/Modal";
import Gameboard from "../gameboard/Gameboard";
import Topbar from "../Topbar/Topbar";
import { CSSTransition } from "react-transition-group";
import { useGame } from "../../hooks/useGame";
import { useError } from "../../hooks/useError";
import { useHeight } from "../../hooks/useHeight";

function Game() {
  const { errorMessages, latestError, createError, errorAnimation } =
    useError();
  const {
    input,
    letters,
    guessed,
    gameState,
    compareLetters,
    setInput,
    setGameState,
    handleSubmit,
    checkWin,
    restart,
  } = useGame(createError);
  const { height } = useHeight();

  return (
    <>
      <div className="game-wrapper">
        <div style={{ height: height }} className="game">
          <Topbar gameState={gameState} guessed={guessed} onClick={checkWin} />
          <CSSTransition
            in={errorMessages.length > 0}
            timeout={500}
            classNames="alert"
            unmountOnExit
          >
            <span className="error">{latestError}</span>
          </CSSTransition>
          <Gameboard
            input={input}
            guessed={guessed}
            errorAnimation={errorAnimation}
            compareLetters={compareLetters}
          />
          <Keyboard
            onKeyPress={setInput}
            onSubmit={handleSubmit}
            guessed={guessed}
            letters={letters}
            disabled={gameState !== "active" || errorAnimation}
          />
        </div>
      </div>
      {gameState !== "active" && gameState !== "pause" && (
        <Modal
          letters={letters}
          guessed={guessed}
          gameState={gameState}
          restart={restart}
          onClickOverlay={() => setGameState("pause")}
        />
      )}
    </>
  );
}

export default Game;
