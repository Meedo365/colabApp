import React from 'react';
import './index.css';
import StoreContext from './context/store';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import AllEvents from './pages/allEvents';
import OneEvent from './pages/oneEvent';
import Login from './pages/login';
function App() {
  return (
    <StoreContext>
      <Router>
        <Routes>
          <Route path="/" element={<AllEvents />} />
          <Route path="/login" element={<Login />} />
          <Route path="/event/:id" element={<OneEvent />} />
        </Routes>
      </Router>
    </StoreContext>
  );
}

export default App;
