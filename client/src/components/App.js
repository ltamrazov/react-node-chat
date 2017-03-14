import React, {Component} from 'react';
import Navigation from 'Navigation';

const App = ({ children }) => {
  return (
    <div>
      <Navigation />
      <div className="container">
        {children}
      </div>
    </div>
  );
};


export default App;
