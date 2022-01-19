import { useState, useEffect } from "react";

export const useHeight = () => {
  const [height, setHeight] = useState(window.innerHeight);

  useEffect(() => {
    window.addEventListener("resize", () => {
      setHeight(window.innerHeight);
    });
  }, [setHeight]);

  return { height };
};
