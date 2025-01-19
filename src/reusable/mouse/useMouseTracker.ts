import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { updateMousePosition } from "./mouseSlice.ts";

const useMouseTracker = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      dispatch(updateMousePosition({ x: event.clientX, y: event.clientY }));
    };

    const handleTouchMove = (event: TouchEvent) => {
      if (event.touches.length > 0) {
        const touch = event.touches[0];
        dispatch(updateMousePosition({ x: touch.clientX, y: touch.clientY }));
      }
    };


    const handleTouchClick = (event: TouchEvent) => {
      if (event.touches.length > 0) {
        const touch = event.touches[0];
        dispatch(updateMousePosition({ x: touch.clientX, y: touch.clientY }));
      }
    };

    
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('touchmove', handleTouchMove);
    window.addEventListener('touchstart', handleTouchClick);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchstart', handleTouchClick);
    };
  }, [dispatch]);
};

export default useMouseTracker;