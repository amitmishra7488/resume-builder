import React, { useState } from 'react';
import './App.css';
import NavBar from './components/Navbar';
import AllRoutes from './Routes/AllRoutes';


function App() {

  return (
    <div>
      <NavBar/>
      <AllRoutes/>
      
    </div>
  );
}

export default App;
