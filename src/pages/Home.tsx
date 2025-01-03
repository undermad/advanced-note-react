import { COLUMNS } from "../reusable/FakeFiles.ts";
import DragAndDrop from "../reusable/DragAndDrop.tsx";

const Home = () => {


  console.log(COLUMNS);

  return <div className={"px-10"}>
    <DragAndDrop />
  </div>;
};

export default Home;
