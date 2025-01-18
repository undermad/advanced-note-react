import { Route, Routes } from "react-router";
import Home from "./pages/Home.tsx";
import About from "./pages/About.tsx";
import useMouseTracker from "./reusable/hooks/mouse/useMouseTracker.ts";

function App() {
  
  useMouseTracker();

  return (
    <Routes>
      <Route path={""} element={<Home />} />
      <Route path={"about"} element={<About />} />


      {/*<Route element={<AuthLayout />}>*/}
      {/*  <Route path="login" element={<Login />} />*/}
      {/*  <Route path="register" element={<Register />} />*/}
      {/*</Route>*/}

    </Routes>
  );
}

export default App;
