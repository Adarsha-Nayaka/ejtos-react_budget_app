import React, { useContext } from 'react';
import { TiDelete } from 'react-icons/ti';
import { AppContext } from '../context/AppContext';

const ExpenseList = () => {
    const { expenses } = useContext(AppContext);
    const { selectedCurrency } = useContext(AppContext); // Get selected currency from context

    return (
        <table className='table'>
            <thead className="thead-light">
                <tr>
                    <th scope="col">Department</th>
                    <th scope="col">Allocated Budget</th>
                    <th scope="col">Increase by 10</th>
                    <th scope="col">Decrease by 10</th>
                    <th scope="col">Delete</th>
                </tr>
            </thead>
            <tbody>
                {expenses.map((expense) => (
                    <ExpenseItem id={expense.id} key={expense.id} name={expense.name} cost={expense.cost} selectedCurrency={selectedCurrency} />
                ))}
            </tbody>
        </table>
    );
};

const ExpenseItem = (props) => {
    const { dispatch } = useContext(AppContext);
    const { selectedCurrency } = useContext(AppContext); // Get selected currency from context

    const handleDeleteExpense = () => {
        dispatch({
            type: 'DELETE_EXPENSE',
            payload: props.id,
        });
    };

    const increaseAllocation = (name) => {
        const expense = {
            name: name,
            cost: 10,
        };
        dispatch({
            type: 'ADD_EXPENSE',
            payload: expense
        });
    }

    const decreaseAllocation = (name) => {
        const expense = {
            name: name,
            cost: -10, // Decrease by 10
        };
        dispatch({
            type: 'ADD_EXPENSE',
            payload: expense
        });
    }

    return (
        <tr>
            <td>{props.name}</td>
            <td>{selectedCurrency === 'pound' ? '£' : selectedCurrency === 'dollar' ? '$' : selectedCurrency === 'euro' ? '€' : '₹'}{props.cost}</td>
            <td><button onClick={event => increaseAllocation(props.name)}>+</button></td>
            <td><button onClick={event => decreaseAllocation(props.name)}>-</button></td>
            <td><TiDelete size='1.5em' onClick={handleDeleteExpense}></TiDelete></td>
        </tr>
    );
};

export default ExpenseList;
