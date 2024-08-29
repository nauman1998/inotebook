import './App.css';
import React, { useState, useEffect } from 'react'
// import { getFcmToken, onMessageListener } from './firebase';

import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import Home from './components/Home';
import { Navbar } from './components/Navbar';
import { About } from './components/About';
import NoteState from './context/notes/NoteState';
import Alert from './components/Alert';
import Signup from './components/Signup';
import Login from './components/Login';
import LoadingBar from 'react-top-loading-bar'

function App() {
  const [progress, setprogress] = useState(100);


  const setProgress = (progress) => {

    setprogress(progress)
  }

  const [alert, setalert] = useState(null);
  const showAlert = (message, type) => {
    setalert({
      msg: message,
      type: type,
    });
    setTimeout(() => {
      setalert(null);
    }, 1500);
  };
  return (
    <>

      

      <NoteState>
        <Router>
          <Navbar />
          <LoadingBar
          height={3}
          color='#f11946'
          progress={progress}
        // onLoaderFinished={() => setProgress(0)}
        />
          <Alert alert={alert} />
          <div className="container">
            <Routes>
              <Route>
                <Route exact path="/" element={<Home setProgress={setProgress} showAlert={showAlert} />} />
                <Route exact path="/about" element={<About />} />
                <Route exact path="/login" element={<Login setProgress={setProgress}  showAlert={showAlert} />} />
                <Route exact path="/signup" element={<Signup setProgress={setProgress}  showAlert={showAlert} />} />
              </Route>
            </Routes>
          </div>
        </Router>
      </NoteState>
    </>
  );
}

export default App;
