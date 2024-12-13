import React, { useState } from 'react';
import { getTimezone } from '../api/api';

const TimezoneDisplay = () => {
  const [lat, setLat] = useState('');
  const [lng, setLng] = useState('');
  const [timezone, setTimezone] = useState(null);
  const [error, setError] = useState('');

  const handleGetTimezone = async () => {
    setError('');
    try {
      const timestamp = Math.floor(Date.now() / 1000); // Current timestamp in seconds
      const data = await getTimezone(lat, lng, timestamp);
      setTimezone(data);
    } catch (error) {
      setError('Failed to fetch timezone data.');
    }
  };

  return (
    <section id="timezone">
      <h2>Timezone Information</h2>
      <div>
        <input
          type="text"
          value={lat}
          onChange={(e) => setLat(e.target.value)}
          placeholder="Latitude"
        />
        <input
          type="text"
          value={lng}
          onChange={(e) => setLng(e.target.value)}
          placeholder="Longitude"
        />
        <button onClick={handleGetTimezone}>Get Timezone</button>
      </div>
      {timezone && (
        <div>
          <p>Timezone: {timezone.timeZoneName}</p>
          <p>Timezone ID: {timezone.timeZoneId}</p>
        </div>
      )}
      {error && <p>{error}</p>}
    </section>
  );
};

export default TimezoneDisplay;
