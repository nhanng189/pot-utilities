import { useRef, useEffect } from "react";

module.exports = {
  useAnimationFrame: (callback) => {
    const engineRef = useRef();
    const previousEngineRef = useRef();

    const animate = (engine) => {
      if (previousEngineRef.current != undefined) {
        callback();
      }
      previousEngineRef.current = engine;
      engineRef.current = requestAnimationFrame(animate);
    };

    useEffect(() => {
      engineRef.current = requestAnimationFrame(animate);
      return () => cancelAnimationFrame(engineRef.current);
    }, []);
  },
};
