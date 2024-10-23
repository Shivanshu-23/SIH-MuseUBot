// MuseumDetails.js
import React from 'react';

const MuseumDetails = ({ museum }) => {
  if (!museum) {
    return null; // Return null if no museum details are provided
  }

  return (
    <div className="museum-details">
      <h2 className="museum-name">{museum.name}</h2>
      <p className="museum-description">{museum.description}</p>
      <div className="museum-info">
        <p><strong>Location:</strong> {museum.location}</p>
        <p><strong>Opening Hours:</strong> {museum.hours}</p>
        <p><strong>Ticket Price:</strong> {museum.ticketPrice}</p>
      </div>
    </div>
  );
};

export default MuseumDetails;
