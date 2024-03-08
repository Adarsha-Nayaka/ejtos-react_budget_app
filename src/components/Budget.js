import React, { useContext, useState } from 'react';
import { AppContext } from '../context/AppContext';

const Budget = () => {
    const { budget, expenses } = useContext(AppContext);
    const [newBudget, setNewBudget] = useState(budget);
    const totalExpenses = expenses.reduce((total, item) => total + item.cost, 0);
    const [currency, setCurrency] = useState('£'); // Default currency is set to Pound

    const handleCurrencyChange = (event) => {
        setCurrency(event.target.value);
    }

    const handleBudgetChange = (event) => {
        const value = parseFloat(event.target.value); // Convert input value to a number
        if (!isNaN(value) && value >= totalExpenses) {
            setNewBudget(value);
        } else {
            alert("Budget cannot be less than total expenses.");
        }
    }

    return (
        <div className='alert alert-secondary'>
            <span>Currency: </span>
            <select className="custom-select" style={{ width: 'auto', marginLeft: '10px' }} value={currency} onChange={handleCurrencyChange}>
                <option value="$">$ Dollar</option>
                <option value="£">£ Pound</option>
                <option value="€">€ Euro</option>
                <option value="₹">₹ Rupee</option>
            </select>
            <br />
            <br />
            <span>Budget: </span>
            <div className="input-group mb-3">
                <div className="input-group-prepend">
                    <span className="input-group-text">{currency}</span>
                </div>
                <input type="number" step="10" min={totalExpenses} className="form-control" value={newBudget} onChange={handleBudgetChange} />
            </div>
            <span>Total Expenses: {currency}{totalExpenses}</span>
        </div>
    );
};

export default Budget;
