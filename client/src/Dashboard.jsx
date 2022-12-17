import { useSate, useEffect } from 'react';


var Dashboard = (props) => {
  return (
    <div>
      <div>Total Income: {props.totalIncome} </div>
      <div>Total Expense: {props.totalExpense} </div>
      <div>Saving Target: {props.target} </div>
      <div>Available: {props.totalIncome - props.target - props.totalExpense} </div>
    </div>
  )
}

export default Dashboard;