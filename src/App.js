import About from "./components/About";
import Home from "./components/Home";
import Navbar from "./components/Navbar";
import NoteState from "./context/notes/NoteState";
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";

function App() {
  return (
    <>
      <NoteState>
        <Router>
          <Navbar />
          <div className="container my-4">
          <Routes>
            <Route exact path="/" element={<Home />}></Route>
            <Route exact path="/home" element={<Home />}></Route>
            <Route exact path="/about" element={<About />}></Route>
          </Routes>
          </div>
        </Router>
      </NoteState>
    </>
  );
}

export default App;
