import { useEffect, useRef } from 'react';
import Lenis from '@studio-freight/lenis';

/**
 * Hook for implementing smooth scrolling using Lenis
 * @param {Object} options - Configuration options for Lenis
 * @returns {Object} Lenis instance reference
 */
export const useSmoothScroll = (options = {}) => {
  const lenisRef = useRef(null);
  
  useEffect(() => {
    // Initialize Lenis with default options for smooth scrolling
    lenisRef.current = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      direction: 'vertical',
      gestureDirection: 'vertical',
      smooth: true,
      smoothTouch: false,
      touchMultiplier: 2,
      ...options
    });
    
    // Create animation frame loop for Lenis
    function raf(time) {
      lenisRef.current?.raf(time);
      requestAnimationFrame(raf);
    }
    
    // Start the animation loop
    requestAnimationFrame(raf);
    
    return () => {
      // Clean up Lenis instance on unmount
      lenisRef.current?.destroy();
    };
  }, [options]);
  
  return lenisRef;
};