import React, { useState, useEffect } from 'react';
import '../Styles/TicketAvailability.css';

const TicketAvailability = () => {
  // Sample data for museums in India
  const data = {
    'Maharashtra': {
      'Mumbai': ['Chhatrapati Shivaji Maharaj Vastu Sangrahalaya', 'Dr. Bhau Daji Lad Museum', 'Nehru Science Centre'],
      'Pune': ['Raja Dinkar Kelkar Museum', 'National War Museum'],
    },
    'Delhi': {
      'New Delhi': ['National Museum', 'Gandhi Smriti', 'Indira Gandhi National Centre for the Arts'],
      'Delhi': ['National Gallery of Modern Art', 'Rail Museum'],
    },
    'Karnataka': {
      'Bengaluru': ['Visvesvaraya Industrial and Technological Museum', 'National Gallery of Modern Art'],
      'Mysuru': ['Mysore Palace', 'Rail Museum Mysore'],
    },
    'Tamil Nadu': {
      'Chennai': ['Government Museum', 'National Art Gallery', 'MGR Film City'],
      'Madurai': ['Gandhi Museum', 'Thirumalai Nayakkar Palace'],
    },
    'West Bengal': {
      'Kolkata': ['Indian Museum', 'Science City', 'Rabindra Sarobar'],
    },
  };

  const [state, setState] = useState('');
  const [city, setCity] = useState('');
  const [museum, setMuseum] = useState('');
  const [cities, setCities] = useState([]);
  const [museums, setMuseums] = useState([]);
  const [availability, setAvailability] = useState(null);
  const [visitingDate, setVisitingDate] = useState('');
  const [visitingTime, setVisitingTime] = useState('');
  const [numVisitors, setNumVisitors] = useState(1);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedMuseum, setSelectedMuseum] = useState(null);

  useEffect(() => {
    if (state) {
      setCities(Object.keys(data[state] || {}));
      setMuseums([]);
      setCity('');
      setMuseum('');
    }
  }, [state]);

  useEffect(() => {
    if (city) {
      setMuseums(data[state][city] || []);
      setMuseum('');
    }
  }, [city, state]);

  const checkAvailability = () => {
    let availableMuseums = [];
    
    if (state && city && !museum) {
      availableMuseums = data[state][city].map(m => ({
        museum: m,
        ticketsAvailable: Math.floor(Math.random() * 50) + 1,
        price: 100 + Math.floor(Math.random() * 401), // Price between ₹100 and ₹500
      }));
    } else if (state && !city) {
      availableMuseums = Object.values(data[state]).flat().map(m => ({
        museum: m,
        ticketsAvailable: Math.floor(Math.random() * 50) + 1,
        price: 100 + Math.floor(Math.random() * 401),
      }));
    } else if (state && city && museum) {
      const ticketsAvailable = Math.floor(Math.random() * 50) + 1;
      const price = 100 + Math.floor(Math.random() * 401);
      availableMuseums = [{ museum, ticketsAvailable, price }];
    }

    setAvailability(availableMuseums);
  };

  const bookTickets = (museum) => {
    setSelectedMuseum(museum);
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
    setSelectedMuseum(null);
  };

  return (
    <div className="ticket-booking-container">
      <h2>Check Museum Ticket Availability</h2>

      <div className="form-group">
        <label>
          State:
          <select value={state} onChange={(e) => setState(e.target.value)}>
            <option value="">--Select State--</option>
            {Object.keys(data).map((st) => (
              <option key={st} value={st}>{st}</option>
            ))}
          </select>
        </label>
      </div>

      <div className="form-group">
        <label>
          City:
          <select value={city} onChange={(e) => setCity(e.target.value)} disabled={!state}>
            <option value="">--Select City--</option>
            {cities.map((ct) => (
              <option key={ct} value={ct}>{ct}</option>
            ))}
          </select>
        </label>
      </div>

      <div className="form-group">
        <label>
          Museum:
          <select value={museum} onChange={(e) => setMuseum(e.target.value)} disabled={!city}>
            <option value="">--Select Museum--</option>
            {museums.map((ms) => (
              <option key={ms} value={ms}>{ms}</option>
            ))}
          </select>
        </label>
      </div>

      <div className="form-group">
        <label>
          Date:
          <input
            type="date"
            value={visitingDate}
            onChange={(e) => setVisitingDate(e.target.value)}
          />
        </label>
      </div>

      <div className="form-group">
        <label>
          Timing:
          <input
            type="time"
            value={visitingTime}
            onChange={(e) => setVisitingTime(e.target.value)}
          />
        </label>
      </div>

      <div className="form-group">
        <label>
          Visitors:
          <input
            type="number"
            value={numVisitors}
            onChange={(e) => setNumVisitors(e.target.value)}
            min="1"
            max="10"
          />
        </label>
      </div>

      <div className='btn-container'>
        <button onClick={checkAvailability} disabled={!state || !visitingDate || !visitingTime} className='submit-btn'>
          Check Ticket Availability
        </button>
      </div>

      {availability && (
        <div>
          <h3>Available Tickets</h3>
          {availability.length > 0 ? (
            <ul>
              {availability.map((m, idx) => (
                <li key={idx}>
                  {m.museum}: {m.ticketsAvailable} tickets available at ₹{m.price}
                  <button onClick={() => bookTickets(m.museum)} className='slot-book-btn'>Book Now</button>
                </li>
              ))}
            </ul>
          ) : (
            <p>No museums or tickets available for the selected options.</p>
          )}
        </div>
      )}

      {modalVisible && selectedMuseum && (
        <div className="modal">
          <div className="modal-content">
            <h3>{selectedMuseum}</h3>
            <div className="slot-item">
              <span>10:00 AM</span>
              <span>Price: Rs{availability.find(m => m.museum === selectedMuseum).price}</span>
              <button className="slot-book-btn">Book</button>
            </div>
            <div className="slot-item">
              <span>01:00 PM</span>
              <span>Price: Rs{availability.find(m => m.museum === selectedMuseum).price}</span>
              <button className="slot-book-btn">Book</button>
            </div>
            <div className="slot-item">
              <span>03:00 PM</span>
              <span>Price: Rs{availability.find(m => m.museum === selectedMuseum).price}</span>
              <button className="slot-book-btn">Book</button>
            </div>
            <button onClick={closeModal} className="close-modal-btn">Close</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default TicketAvailability;
