import { useSelector } from "react-redux";
import { RootState } from "../../../state/State.ts";

const useMousePosition = () => {
  return useSelector((state: RootState) => state.mousePosition);
};

export default useMousePosition;