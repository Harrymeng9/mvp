// import {React, useState, useEffect} from "react";
import * as React from 'react';
import { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { createRoot } from 'react-dom/client';
import Dashboard from './Dashboard.jsx';
import Transaction from './Transaction.jsx';
import Date from './Date.jsx';

const axios = require('axios');

const App = (props) => {

  const [month, setMonth] = useState('Jan');
  const [totalIncome, setTotalIncome] = useState(0);
  const [totalExpense, setTotalExpense] = useState(0);
  const [target, setTarget] = useState(0);

  return (
    <div>
      {/* <div id='title'>2022 Account</div> */}
      <br></br>
      <div className='date'>
        <Date month={month} setMonth={setMonth} setTarget={setTarget} setTotalIncome={setTotalIncome} setTotalExpense={setTotalExpense} />
      </div>
      <br></br>
      <div className='show'>
        {/* <div className='card'> */}
          <Transaction month={month} setTarget={setTarget} setTotalIncome={setTotalIncome} setTotalExpense={setTotalExpense} />
        {/* </div> */}
        <br></br>
        <div className='card'>
          <Dashboard target={target} totalIncome={totalIncome} totalExpense={totalExpense} />
        </div>
      </div>
    </div>
  )
};

const container = document.getElementById('app');
const root = createRoot(container);
root.render(<App tab="home" />);

// Old version of React
// ReactDOM.render(<App />, document.getElementById('app'));

export default App;