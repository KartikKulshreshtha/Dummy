import React from 'react';
import { Link } from 'react-router-dom';

function LandingPage() {
  return (
    <div>
      <h1>Welcome to Room Booking</h1>
      <p>Book a room for your next event.</p>
      <Link to="/rooms">View Rooms</Link>
    </div>
  );
}

export default LandingPage;