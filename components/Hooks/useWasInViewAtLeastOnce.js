import { useState, useEffect } from "react";
import { useInView } from "react-intersection-observer";

export const useWasInViewAtLeastOnce = () => {
  const [wasInViewAtLeastOnce, setWasInViewAtLeastOnce] = useState(false);

  const { ref: setRef, inView } = useInView();

  useEffect(() => {
    if (inView) {
      setWasInViewAtLeastOnce(true);
    }
  }, [inView]);

  return { setRef, wasInViewAtLeastOnce };
};
