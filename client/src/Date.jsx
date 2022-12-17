import { useSate, useEffect } from 'react';
const axios = require('axios');

var Date = (props) => {

  function searchDate() {

    const options = {
      url: 'http://localhost:3000/mvp',
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json;charset=UTF-8'
      },
      data: {
        Month: props.month
      }
    };

    // send GET request to server with selected month data
    axios.get('http://localhost:3000/mvp', {params: {Month: props.month}})
      .then((result) => {
        // If there is no transaction for selected month, then set everything(target/income/expense) to zero
        if (result.data.length === 0) {
          props.setTotalIncome(0);
          props.setTotalExpense(0);
          props.setTarget(0);
        } else{
          // If data exists in database for selected month, then run for loop to fetch related target/income/expense, and setState();
          for (var i = 0; i < result.data.length; i++) {
            if (result.data[i]._id === 'Income') {
              props.setTotalIncome(result.data[i].total);
            } else if (result.data[i]._id === 'Expense') {
              props.setTotalExpense(result.data[i].total);
            } else if (result.data[i]._id === 'Target') {
              props.setTarget(result.data[i].total);
            }
          }
        }
        // console.log('post and get data sucessful', result);
      })
      .catch((err) => console.log(err));
  };

  return (
    <div>
      <label>
        Month:
        <select value={props.month} onChange={(e) => props.setMonth(e.target.value)}>
          <option value="Jan">Jan</option>
          <option value="Feb">Feb</option>
          <option value="Mar">Mar</option>
          <option value="Apr">Apr</option>
          <option value="May">May</option>
          <option value="Jun">Jun</option>
          <option value="Jul">Jul</option>
          <option value="Aug">Aug</option>
          <option value="Sep">Sep</option>
          <option value="Oct">Oct</option>
          <option value="Nov">Nov</option>
          <option value="Dec">Dec</option>
        </select>
      </label>
      <button onClick={searchDate}>Search</button>
    </div>
  )
};

export default Date;