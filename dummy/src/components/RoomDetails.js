import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import BookingCalendar from './BookingCalendar';

function RoomDetails() {
  const { id } = useParams();
  const [room, setRoom] = useState(null);
  const [bookingStart, setBookingStart] = useState(null);
  const [bookingEnd, setBookingEnd] = useState(null);

  useEffect(() => {
    const fetchRoom = async () => {
      try {
        const response = await axios.get(`/api/rooms/${id}`);
        setRoom(response.data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchRoom();
  }, [id]);

  const handleBooking = async () => {
    try {
      const userId = 'user123'; // Replace with actual user id
      const response = await axios.post(`/api/rooms/${id}/bookings`, {
        start: bookingStart,
        end: bookingEnd,
        userId,});
        console.log(response.data);
        // Handle successful booking
      } catch (err) {
        console.error(err);
        // Handle booking error
      }
    };
  
    if (!room) {
      return <div>Loading...</div>;
    }
  
    return (
      <div>
        <h2>{room.name}</h2>
        <p>Capacity: {room.capacity}</p>
        <BookingCalendar
          onDateChange={(start, end) => {
            setBookingStart(start);
            setBookingEnd(end);
          }}
        />
        <button onClick={handleBooking} disabled={!bookingStart || !bookingEnd}>
          Book Room
        </button>
      </div>
    );
  }
  
  export default RoomDetails;