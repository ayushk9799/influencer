import { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";

const ScrollManager = () => {
  const location = useLocation();
  const scrollPositions = useRef(new Map());

  useEffect(() => {
    const handleScroll = () => {
      scrollPositions.current.set(location.key, window.scrollY);
    };

    window.addEventListener("scroll", handleScroll);

    const scrollPosition = scrollPositions.current.get(location.key);
    if (scrollPosition) {
      setTimeout(() => {
        window.scrollTo(0, scrollPosition);
      }, 100);
    } else {
      window.scrollTo(0, 0);
    }

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [location.pathname]);

  return null;
};

export default ScrollManager;
