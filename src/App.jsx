import React from 'react';
import Header from './components/Header.jsx';
import CurrencyConverter from './components/CurrencyConverter';
import WorkspaceFinder from './components/WorkspaceFinder';
import TimezoneDisplay from './components/TimezoneDisplay';

const App = () => {
  return (
    <div>
      <Header />
      <CurrencyConverter />
      <WorkspaceFinder />
      <TimezoneDisplay />
    </div>
  );
};

export default App;
