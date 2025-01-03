import { COLUMNS } from "../reusable/FakeFiles.ts";
import NotesFiles from "../feauters/notes/NotesFiles.tsx";

const Home = () => {


  console.log(COLUMNS);

  return <div className={"px-10"}>
    <NotesFiles/>
  </div>;
};

export default Home;
