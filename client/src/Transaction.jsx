import { useState, useEffect } from 'react';
const axios = require('axios');

var Transaction = (props) => {

  const [inputCategory, setInputCategory] = useState('');
  const [inputAmount, setInputAmount] = useState(0);

  // Once click button, send a POST request to server
  function submitTransaction(e) {

    const options = {
      url: 'http://localhost:3000/mvp',
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json;charset=UTF-8'
      },
      data: {
        Month: props.month,
        Category: inputCategory,
        Amount: inputAmount
      }
    };
    // If client enters correct info, then keep moving.
    // if not, pop up an alert window and ask client to enter right info
    if (inputCategory !== '---' && inputAmount > 0) {
      // Send POST request to server
      axios(options)
        .then((data) => {
          console.log('POST request successfully!');
        })
        // send GET request to server with selected month data
        .then(() => {
          axios.get('http://localhost:3000/mvp', { params: { Month: props.month } })
            .then((result) => {
              // console.log('data', result.data);
              for (var i = 0; i < result.data.length; i++) {
                if (result.data[i]._id === 'Income') {
                  props.setTotalIncome(result.data[i].total);
                } else if (result.data[i]._id === 'Expense') {
                  props.setTotalExpense(result.data[i].total);
                } else if (result.data[i]._id === 'Target') {
                  props.setTarget(result.data[i].total);
                }
              }
              console.log('GET request successfully!');
            })
        });
      // After click on Submit Transaction button, "Category" and "Amount" field will be reset to default (empty)
      setInputCategory('');
      setInputAmount('');

    } else {
      alert('Please enter a valid info');
    }
  };

  return (
    < div className='card'>
      <label>
        Category:
        <select value={inputCategory} onChange={(e) => setInputCategory(e.target.value)}>
          <option value="---">---</option>
          <option value="Income">Income</option>
          <option value="Expense">Expense</option>
          <option value="Target">Target</option>
        </select>
      </label>
      <div>Amount:<input type="number" value={inputAmount} onChange={(e) => setInputAmount(e.target.value)} /></div>
      <button onClick={submitTransaction}> Submit Transaction</button >
    </div >
  )
}

export default Transaction;

