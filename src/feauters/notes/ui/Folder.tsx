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

  const dispatch = useDispatch();
  

  const [collapsed, setCollapsed] = useState(folder.collapsed);

  const toggleRotation = () => {
    setCollapsed((prev) => !prev);
  };

  if (!folder || folder.depth === undefined) {
    return null;
  }

  const style = {
    marginLeft: folder.depth * 20,
    transition: "0.1s ease-in"
  };

  const handleCollapseClick = () => {
    if (collapsed) {
      clientFilesAction.unCollapseFolder(dispatch, folder.id, folder.rootId);
    } else {
      clientFilesAction.collapseFolder(dispatch, folder.id, folder.rootId);
    }
    toggleRotation();
  };

  console.log(collapsed)

  return <>
    <div className={"flex gap-1 items-center text-sm"}>

      <div className={`pl-2 flex gap-1 items-center text-sm`} style={style}>
        <motion.div
          initial={{
            rotate: collapsed ? -90 : 0,
          }}
          style={{ display: "inline-block", cursor: "pointer" }}
          animate={{ rotate: collapsed ? -90 : 0 }}
          transition={{ duration: 0.1, ease: "easeInOut" }}
          onClick={handleCollapseClick}>
          <IoIosArrowDown width={12} height={12} />
        </motion.div>
        <CiFolderOn width={12} height={12} />
        {folder.name}
      </div>


    </div>
  </>;
};

export default Folder;