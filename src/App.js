import React from 'react';
import './index.css';
import StoreContext from './context/store';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import AllEvents from './pages/allEvents';
function App() {
  return (
    <StoreContext>
      <Router>
        <Routes>
          <Route path="/" element={<AllEvents />} />
        </Routes>
      </Router>
    </StoreContext>
  );
}

export default App;
