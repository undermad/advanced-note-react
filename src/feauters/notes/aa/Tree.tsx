import { useGetFilesQuery } from "../FilesApiSlice.ts";
import TreeComponent from "./TreeComponent.tsx";
import { AppearAnimation } from "../../../reusable/animation/AppearAnimation.tsx";

const Tree = () => {
  const { data, isLoading } = useGetFilesQuery({ rootId: "642ff1d0-f923-4417-a8ea-4cbc7d52e18b" });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return <AppearAnimation>
    <TreeComponent files={data ? data : []} />
  </AppearAnimation>;
};

export default Tree;