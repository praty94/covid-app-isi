import { useState, useEffect } from 'react';
import debounce from './Debounce';
function getWindowDimensions() {
  const { innerWidth: width, innerHeight: height } = window;
  return {
    width,
    height
  };
}

export default function useWindowDimensions() {
  const [windowDimensions, setWindowDimensions] = useState(getWindowDimensions());

  useEffect(() => {
    function handleResize() {
      console.log("window resized");
      setWindowDimensions(getWindowDimensions());
    }

    window.addEventListener('resize', debounce(handleResize,200));
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return windowDimensions;
}