import React, { useState, useEffect } from "react";

module.exports = {
  useAnimationFrame: (callback) => {
    const engineRef = React.useRef();
    const previousEngineRef = React.useRef();

    const animate = (engine) => {
      if (previousEngineRef.current != undefined) {
        callback();
      }
      previousEngineRef.current = engine;
      engineRef.current = requestAnimationFrame(animate);
    };

    React.useEffect(() => {
      engineRef.current = requestAnimationFrame(animate);
      return () => cancelAnimationFrame(engineRef.current);
    }, []);
  },

  useWindowSize: () => {
    // Initialize state with undefined width/height so server and client renders match
    // Learn more here: https://joshwcomeau.com/react/the-perils-of-rehydration/
    const [windowSize, setWindowSize] = useState({
      width: undefined,
      height: undefined,
    });

    useEffect(() => {
      // only execute all the code below in client side
      if (typeof window !== "undefined") {
        // Handler to call on window resize
        function handleResize() {
          // Set window width/height to state
          setWindowSize({
            width: window.innerWidth,
            height: window.innerHeight,
          });
        }

        // Add event listener
        window.addEventListener("resize", handleResize);

        // Call handler right away so state gets updated with initial window size
        handleResize();

        // Remove event listener on cleanup
        return () => window.removeEventListener("resize", handleResize);
      }
    }, []); // Empty array ensures that effect is only run on mount
    return windowSize;
  },
};
