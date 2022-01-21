import React, { useState } from "react";
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
  const [openModal, setOpenModal] = useState(false);

  return (
    <>
      <div className="game-wrapper">
        <div style={{ height: height }} className="game">
          <Topbar
            gameState={gameState}
            guessed={guessed}
            onClickLeft={setOpenModal}
            onClickRight={checkWin}
          />
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
            input={input}
          />
        </div>
      </div>
      {gameState !== "active" && gameState !== "pause" && (
        <Modal
          type="gameEnd"
          letters={letters}
          guessed={guessed}
          gameState={gameState}
          restart={restart}
          onExit={() => setGameState("pause")}
        />
      )}
      {openModal && (
        <Modal
          type="instructions"
          letters={letters}
          guessed={guessed}
          gameState={gameState}
          restart={restart}
          onExit={() => setOpenModal(false)}
        />
      )}
    </>
  );
}

export default Game;
