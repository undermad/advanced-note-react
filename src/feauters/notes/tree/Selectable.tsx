import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../state/State.ts";
import {
  addFileToSelection,
  isFileSelected,
  selectAllSelectedFiles,
  selectFile,
  selectMultipleFiles, selectSingleMultiFile
} from "../FilesSlice.ts";
import { KeyboardShortcuts, useKeyboardShortcuts } from "../../../reusable/keyboard/useKeyboardShortcuts.ts";

type Props = {
  children: React.ReactNode,
  itemId: string,
  allSelectable: string[]
}

const Selectable = ({ children, itemId, allSelectable }: Props) => {

  const isSelected = useSelector((state: RootState) => isFileSelected(state, itemId));
  const selectedFiles = useSelector((state: RootState) => selectAllSelectedFiles(state));
  const dispatch = useDispatch();
  const singleSelect = useKeyboardShortcuts(KeyboardShortcuts.SingleSelect);
  const multipleSelect = useKeyboardShortcuts(KeyboardShortcuts.MultipleSelect);
  const singleMultiSelect = useKeyboardShortcuts(KeyboardShortcuts.SingleMultiSelect);


  const handleClick = () => {
    if (selectedFiles.length === 0) {
      dispatch(selectFile({ fileId: itemId }));
      return;
    }
    if (singleMultiSelect) {
      const slice = obtainSlice();
      dispatch(selectSingleMultiFile({ filesIds: slice }));
    } else if (multipleSelect) {
      const slice = obtainSlice()!;
      dispatch(selectMultipleFiles({ filesIds: slice }));
    } else if (singleSelect) {
      dispatch(addFileToSelection({ fileId: itemId }));
    } else {
      dispatch(selectFile({ fileId: itemId }));
    }

  };

  const obtainSlice = () => {
    const lastSelected = selectedFiles[selectedFiles.length - 1];
    const lastSelectedIndex = allSelectable.indexOf(lastSelected);
    const currentIndex = allSelectable.indexOf(itemId);
    if (lastSelectedIndex > currentIndex) {
      return allSelectable.slice(currentIndex, lastSelectedIndex + 1);
    } else {
      return allSelectable.slice(lastSelectedIndex, currentIndex + 1);
    }
  };


  return <div
    onClick={handleClick}
    className={`${isSelected ? "bg-blue-100" : ""}`}>
    {children}
  </div>;
};

export default Selectable;