import { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../state/State.ts";
import { onKeyPressed, onKeyReleased } from "./keyboardSlice.ts";

const useKeyboardTracker = () => {
  const dispatch = useDispatch();
  const keys = useSelector((state: RootState) => state.keyboard.keys);


  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    e.preventDefault();
    const value = keys[e.code];
    if (value) return;
    dispatch(onKeyPressed({ code: e.code }));
  }, [dispatch, keys]);

  const handleKeyUp = useCallback((e: KeyboardEvent) => {
    e.preventDefault();
    const value = keys[e.code];
    if (!value) return;
    dispatch(onKeyReleased({ code: e.code }));
  }, [dispatch, keys]);


  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
    };

  }, [handleKeyDown, handleKeyUp]);
};

export default useKeyboardTracker;