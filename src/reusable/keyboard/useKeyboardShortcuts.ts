import { useSelector } from "react-redux";
import { RootState } from "../../state/State.ts";

export enum KeyboardShortcuts {
  SingleSelect = "ControlLeft",
  MultipleSelect = "ShiftLeft",
  SingleMultiSelect = "ShiftLeft+ControlLeft",
}


export const useKeyboardShortcuts = (shortcut: KeyboardShortcuts) => {
  const keys = useSelector((state: RootState) => state.keyboard.keys);
  
  const requiredKeys = shortcut.split("+");
  return requiredKeys.every((key) => keys[key]);
}