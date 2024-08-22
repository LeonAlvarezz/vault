import { useState, useEffect } from "react";

export default function useViewport() {
  const [viewport, setViewport] = useState({
    width: 0,
    height: 0,
    keyboardOpen: false,
  });

  useEffect(() => {
    // Check if running on the client side
    if (typeof window !== "undefined") {
      const initialViewportHeight = window.innerHeight;

      // Set initial dimensions
      setViewport({
        width: window.innerWidth,
        height: window.innerHeight,
        keyboardOpen: false,
      });

      const handleResize = () => {
        if (window.visualViewport) {
          const currentHeight = window.visualViewport.height;
          const isKeyboardOpen = initialViewportHeight > currentHeight + 100;
          setViewport({
            width: window.innerWidth,
            height: currentHeight,
            keyboardOpen: isKeyboardOpen,
          });
        }
      };
      if (window.visualViewport) {
        window.visualViewport.addEventListener("resize", handleResize);
      }
      // Cleanup event listener on unmount
      return () =>
        window.visualViewport?.removeEventListener("resize", handleResize);
    }
  }, []);

  return viewport;
}
4;
