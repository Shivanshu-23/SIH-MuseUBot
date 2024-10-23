import React from 'react';
import { useNavigate } from 'react-router-dom';

const AvailableTimeSlots = ({ museum }) => {
  const history = useNavigate();

  // Dummy data for available time slots
  const timeSlots = [
    { time: '10:00 AM', price: 10 },
    { time: '01:00 PM', price: 10 },
    { time: '03:00 PM', price: 10 },
  ];

  const handleProceedToPayment = (time, price) => {
    // Navigate to payment form with selected time and price
    history.push({
      pathname: '/payment',
      state: { time, price, museum },
    });
  };

  return (
    <div className="time-slots-container">
      <h1>Available Time Slots for {museum}</h1>
      <ul>
        {timeSlots.map((slot, index) => (
          <li key={index} className="time-slot">
            {slot.time} - Price: Rs {slot.price}
            <button onClick={() => handleProceedToPayment(slot.time, slot.price)}>
              Proceed to Payment
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AvailableTimeSlots;
