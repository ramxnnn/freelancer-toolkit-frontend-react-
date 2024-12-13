import React, { useState } from 'react';
import { getWorkspaces } from '../api/api';

const WorkspaceFinder = () => {
  const [location, setLocation] = useState('');
  const [workspaces, setWorkspaces] = useState([]);
  const [error, setError] = useState('');

  const handleSearch = async () => {
    setError('');
    try {
      const results = await getWorkspaces(location);
      setWorkspaces(results);
    } catch (error) {
      setError('Failed to fetch workspaces.');
    }
  };

  return (
    <section id="workspaces">
      <h2>Workspace Finder</h2>
      <input
        type="text"
        value={location}
        onChange={(e) => setLocation(e.target.value)}
        placeholder="Enter location"
      />
      <button onClick={handleSearch}>Search</button>
      {error && <p>{error}</p>}
      <ul>
        {workspaces.map((workspace) => (
          <li key={workspace.place_id}>
            <h3>{workspace.name}</h3>
            <p>{workspace.vicinity}</p>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default WorkspaceFinder;
