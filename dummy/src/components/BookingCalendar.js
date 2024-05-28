import React, { useState } from 'react';
import moment from 'moment';

function BookingCalendar({ onDateChange }) {
  const [selectedStart, setSelectedStart] = useState(null);
  const [selectedEnd, setSelectedEnd] = useState(null);

  const handleDateChange = (start, end) => {
    setSelectedStart(start);
    setSelectedEnd(end);
    onDateChange(start, end);
  };

  const renderCalendar = () => {
    return <div>Calendar goes here...</div>;
  };

  return (
    <div>
      <h3>Select Booking Dates</h3>
      {renderCalendar()}
      <p>
        Selected Start: {selectedStart ? moment(selectedStart).format('YYYY-MM-DD') : 'N/A'}
      </p>
      <p>
        Selected End: {selectedEnd ? moment(selectedEnd).format('YYYY-MM-DD') : 'N/A'}
      </p>
    </div> 
  );
}

export default BookingCalendar;