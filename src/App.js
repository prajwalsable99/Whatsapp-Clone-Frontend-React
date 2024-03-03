

import {Route, Routes } from 'react-router-dom';
import HomePage from './components/HomePage';
import StatusComp from './components/status/StatusComp';
import Signup from './components/auth/Signup';
import Signin from './components/auth/Signin';
// import { useEffect, useState } from 'react';
// 



function App() {
  // State to hold authentication status
 

  return (
    <div className="App">
      <Routes>
        <Route path='/signup' element={<Signup />} />
        <Route path='/signin' element={<Signin />} />
        {/* If user is not authenticated, redirect to signin page */}
        <Route path='/' element={<HomePage />} />
        {/* Protected route: If user is not authenticated, redirect to signin page */}
        <Route path='/status' element={ <StatusComp   />} />
      </Routes>
    </div>
  );
}

export default App;
