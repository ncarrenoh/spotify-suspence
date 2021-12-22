import React from 'react';
import HomePage from './components/HomePage';
import { Router } from '@reach/router';
import ArtistPage from './components/ArtistPage';

function App() {
  
  return (
    <Router>
      <HomePage path="/" />
      <ArtistPage path="/artist/:id" />
    </Router>
    
  );
}

export default App;
