import { FileTreeNode } from "../NoteFileSystemTypes.ts";
import { CiFolderOn } from "react-icons/ci";
import { IoIosArrowDown } from "react-icons/io";
import { useDispatch } from "react-redux";
import { clientFilesAction } from "../FilesApiSlice.ts";
import { useState } from "react";
import { motion } from "framer-motion";

type Props = {
  folder: FileTreeNode
}

const Folder = ({ folder }: Props) => {

  const [collapsed, setCollapsed] = useState(folder.collapsed);
  const dispatch = useDispatch();

  const toggleRotation = () => setCollapsed((prev) => !prev);

  if (!folder || folder.depth === undefined) return null;

  const style = {
    marginLeft: folder.depth * 20,
    transition: "0.1s ease-in",
  };

  const handleCollapseClick = () => {
    if (collapsed) {
      clientFilesAction.unCollapseFolder(dispatch, folder.id, folder.rootId);
    } else {
      clientFilesAction.collapseFolder(dispatch, folder.id, folder.rootId);
    }
    toggleRotation();
  };
  

  return <>
    <div className={"flex gap-1 items-center text-sm relative"}>


      <div className={"pl-2 flex gap-1 items-center text-lg relative select-none "} style={style}
           onDoubleClick={handleCollapseClick}
           onTouchStart={handleCollapseClick}>
        {folder.children && folder.children.length > 0 ?
          <motion.div
            onClick={handleCollapseClick}
            onTouchStart={handleCollapseClick}
            initial={{
              rotate: collapsed ? -90 : 0
            }}
            animate={{ rotate: collapsed ? -90 : 0 }}
            transition={{ duration: 0.1, ease: "easeInOut" }}
            className={"absolute -left-[10px] flex p-1"}
          >
            <IoIosArrowDown size={12} />
          </motion.div>
          : <></>}

        <CiFolderOn size={16} />
        {folder.name}
      </div>

    </div>
  </>;
};

export default Folder;