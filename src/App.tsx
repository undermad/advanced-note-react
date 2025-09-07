import { Route, Routes } from "react-router";
import Home from "./pages/Home.tsx";
import About from "./pages/About.tsx";
import useMouseTracker from "./reusable/mouse/useMouseTracker.ts";
import useKeyboardTracker from "./reusable/keyboard/useKeyboardTracker.ts";

function App() {
  
  useMouseTracker();
  useKeyboardTracker();

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
