import React, {Component} from 'react';

const App = ({ children }) => {
  return (
    <div>
      <div className="container">
        {children}
      </div>
    </div>
  );
};


export default App;
