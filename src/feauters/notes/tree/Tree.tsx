import { useGetFilesQuery } from "../FilesApiSlice.ts";
import TreeComponent from "./TreeComponent.tsx";
import { AppearAnimation } from "../../../reusable/animation/AppearAnimation.tsx";

const Tree = () => {
  const { data, isLoading } = useGetFilesQuery({ rootId: "cab4ce86-bb08-4262-a607-255b96bd502c" });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return <AppearAnimation>
    <TreeComponent files={data ? data : []} />
  </AppearAnimation>;
};

export default Tree;