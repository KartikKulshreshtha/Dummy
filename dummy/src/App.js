import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LandingPage from './components/LandingPage';
import RoomList from './components/RoomList';
import RoomDetails from './components/RoomDetails';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route exact path="/" element={<LandingPage />} />
          <Route path="/rooms" element={<RoomList />} />
          <Route path="/room/:id" element={<RoomDetails />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;