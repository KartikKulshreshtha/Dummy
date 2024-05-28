import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

function LandingPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [bookingHours, setBookingHours] = useState(1);

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleBookingHoursChange = (event) => {
    setBookingHours(parseInt(event.target.value));
  };

  const handleSearchSubmit = (event) => {
    event.preventDefault();
    console.log("Search submitted for:", searchQuery, "for", bookingHours, "hours");
  };

  const rooms = [
    { id: '6654ab1fe44c8ab4ffe75051', name: 'Room 1', sound: 'Yes', projector: 'No' },
    { id: '6654ab26e44c8ab4ffe75053', name: 'Room 2', sound: 'No', projector: 'Yes' },
    { id: '6654ab2ee44c8ab4ffe75055', name: 'Room 3', sound: 'Yes', projector: 'Yes' },
    // { id: 4, name: 'Room 4', sound: 'No', projector: 'No' },
  ];

  

  return (
    <div style={{ textAlign: 'center' }}>
      <h1>Welcome to Room Booking</h1>
      <p>Book a room for your next Meeting.</p>
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: '20px' }}>
        <form onSubmit={handleSearchSubmit}>
          <input 
            type="text" 
            placeholder="Search available rooms..." 
            value={searchQuery} 
            onChange={handleSearchChange} 
            style={{ marginRight: '10px' }}
          />
          <select value={bookingHours} onChange={handleBookingHoursChange}>
            <option value={1}>1 hour</option>
            <option value={2}>2 hours</option>
            <option value={3}>3 hours</option>
            <option value={4}>4 hours</option>
            {/* Add more options as needed */}
          </select>
          <button type="submit">Search</button>
        </form>
      </div>
      <div style={{ marginTop: '20px' }}>
        {rooms.map(room => (
          <div key={room.id} style={{ border: '1px solid #ccc', padding: '10px', margin: '10px auto', width: '200px', textDecoration: 'none' }}>
            <Link to={`/room/${room.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
              <h3>{room.name}</h3>
              <p>Sound: {room.sound}</p>
              <p>Projector: {room.projector}</p>
            </Link>
          </div>
        ))}
      </div>
      <Link to="/rooms" style={{ display: 'block', marginTop: '20px' }}>View All Rooms</Link>
    </div>
  );
}

export default LandingPage;
