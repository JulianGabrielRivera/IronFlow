import "./App.css";
import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Home from "./pages/Home";
import NavBar from "./components/NavBar";
import ProjectOneQA from "./pages/ProjectOneQA";
import ProjectTwoQA from "./pages/ProjectTwoQA";
import ProjectThreeQA from "./pages/ProjectThreeQA";
import LabsQA from "./pages/LabsQA";
import DayOne from "./pages/DayOne";
import AdminLabCreate from "./pages/AdminLabCreate";

function App() {
  return (
    <div className="App">
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />}></Route>

        <Route path="/login" element={<Login />}></Route>
        <Route path="/signup" element={<Signup />}></Route>
        <Route path="/labs" element={<LabsQA />}></Route>

        <Route
          path="/:projectNumber/projectOne"
          element={<ProjectOneQA />}
        ></Route>
        <Route
          path="/:projectNumber/projectTwo"
          element={<ProjectTwoQA />}
        ></Route>
        <Route
          path="/:projectNumber/projectThree"
          element={<ProjectThreeQA />}
        ></Route>
        <Route path="/:weekId/:dayQuestions" element={<DayOne />}></Route>
        <Route path="/labs/create" element={<AdminLabCreate />}></Route>
      </Routes>
    </div>
  );
}

export default App;
