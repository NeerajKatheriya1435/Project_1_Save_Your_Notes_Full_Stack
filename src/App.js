
import About from "./components/About";
import Alert from "./components/Alert";
import Home from "./components/Home";
import Login from "./components/Login";
import Navbar from "./components/Navbar";
import Signup from "./components/Signup";
import NoteState from "./context/notes/NoteState";
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import React, { useState } from "react";
function App() {
  const [myAlert, setMyalert] = useState(null)
  const setAlert = (message, type) => {
    setMyalert({
      msg: message,
      type1: type
    })
    setTimeout(() => {
      setMyalert(null);
    }, 1500);
  }
  return (
    <>
      <NoteState>
        <Router>
          <Navbar />
          <Alert alert={myAlert} />
          <div className="container my-4">
            <Routes>
              <Route exact path="/" element={<Home setAlert={setAlert} />}></Route>
              <Route exact path="/home" element={<Home setAlert={setAlert} />}></Route>
              <Route exact path="/about" element={<About />}></Route>
              <Route exact path="/login" element={<Login setAlert={setAlert} />}></Route>
              <Route exact path="/signup" element={<Signup setAlert={setAlert} />}></Route>
            </Routes>
          </div>
        </Router>
      </NoteState>
    </>
  );
}

export default App;
