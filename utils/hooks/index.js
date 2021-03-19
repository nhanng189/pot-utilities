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
};
