import { useState, useCallback } from "react";
import { v4 as uuidv4 } from "uuid";

export const useError = () => {
  const [errorMessages, setErrorMessages] = useState([]);
  const [latestError, setLatestError] = useState();
  const [errorAnimation, setErrorAnimation] = useState();

  const createError = useCallback(
    (message) => {
      const errorId = uuidv4();
      setErrorAnimation(true);
      setTimeout(() => {
        setErrorAnimation(false);
      }, 1000);
      setLatestError(message);
      setErrorMessages((prev) => {
        return [...prev, { id: errorId, message }];
      });
      setTimeout(() => {
        setErrorMessages((prev) =>
          prev.filter((error) => error.id !== errorId)
        );
      }, 1500);
    },
    [setErrorAnimation, setLatestError, setErrorMessages]
  );

  return { errorMessages, latestError, createError, errorAnimation };
};
