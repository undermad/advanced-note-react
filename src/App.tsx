import { Route, Routes } from "react-router";
import Home from "./pages/Home.tsx";
import About from "./pages/About.tsx";

function App() {

  return (
    <Routes>
      <Route path={""} element={<Home />} />
      <Route path={"about"} element={<About />} />


      {/*<Route element={<AuthLayout />}>*/}
      {/*  <Route path="login" element={<Login />} />*/}
      {/*  <Route path="register" element={<Register />} />*/}
      {/*</Route>*/}

      {/*<Route path="concerts">*/}
      {/*  <Route index element={<ConcertsHome />} />*/}
      {/*  <Route path=":city" element={<City />} />*/}
      {/*  <Route path="trending" element={<Trending />} />*/}
      {/*</Route>*/}
    </Routes>
  );
}

export default App;
