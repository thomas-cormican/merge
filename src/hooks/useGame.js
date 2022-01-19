import { useState, useCallback } from "react";
import randomWords from "random-words";
import { list } from "../utils/wordlist";

const generateWord = () => {
  let foundWord;
  while (!foundWord) {
    let generatedWord = randomWords({ exactly: 1, maxLength: 5 });
    if (generatedWord[0].length === 5) {
      foundWord = generatedWord[0];
    }
  }
  return foundWord;
};

export const useGame = (createError) => {
  const [letters, setLetters] = useState(
    generateWord().toUpperCase().split("")
  );
  const [guessed, setGuessed] = useState([]);
  const [input, setInput] = useState([]);
  const [gameState, setGameState] = useState("active");
  const restart = () => {
    setLetters(generateWord().toUpperCase().split(""));
    setGuessed([]);
    setInput([]);
    setGameState("active");
  };

  const compareLetters = useCallback(
    (letter, index) => {
      if (letters.includes(letter)) {
        if (letter === letters[index]) {
          return "in-position";
        } else {
          return "in-word";
        }
      } else {
        return "not-in-word";
      }
    },
    [letters]
  );

  const checkWin = useCallback(
    (guess) => {
      if (guess.join("") === letters.join("")) {
        setGameState("win");
      }
      if (guess.join("") !== letters.join("") && guessed.length >= 5) {
        setGameState("lose");
      }
    },
    [letters, guessed, setGameState]
  );

  const handleSubmit = useCallback(
    (e) => {
      e.preventDefault();
      const parsedWord = input.join("").toLowerCase();

      if (input.length === 5) {
        if (list.includes(parsedWord)) {
          setGuessed((prev) => [...prev, input]);
          setInput([]);
          checkWin(input);
        } else {
          createError("Not in word list");
        }
      } else {
        createError("Not enough letters");
      }
    },
    [input, setGuessed, setInput, checkWin, createError]
  );

  return {
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
  };
};
