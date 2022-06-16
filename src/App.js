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

export default function App(inputText) {
  return (
    <Router>
      <Routes>

        {/* Home Page */}
        <Route path='/' element={
          <Home />
        } />

        {/* Result Page */}
        <Route path={'/result/:slug'} element={
          <Result />
        } />

      </Routes>
    </Router>

  );
}

function Home() {
  return (
    <div className="App">
      <CountrySearch />
    </div>
  )
}

function Result() {
  return (
    <div className="App">
      <CountryResult />
    </div>
  )
}