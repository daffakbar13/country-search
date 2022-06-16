import React from 'react'
import {
  BrowserRouter as Router,
  Routes,
  Route
}
  from 'react-router-dom';
import './App.css';
import CountrySearch from './CountrySearch';
import CountryResult from './CountryResult';

export default function App() {
  return (
    <Router>
      <Routes>

        {/* Home Page */}
        <Route path='/' element={
          <CountrySearch />
        } />

        {/* Result Page */}
        <Route path={'/result/:slug'} element={
          <CountryResult />
        } />

      </Routes>
    </Router>

  );
}
