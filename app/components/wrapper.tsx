'use client'

import RemainingBudget from './RemainingBudget';
import Filters from './Filters';
import ExpenseTable from './Expense';
import { useState, FC } from 'react';

interface ClientProps {
    budget: number;
    expense: Array<Expense>;
}

interface Expense {
    id: string;
    name: string;
    type: string;
    datetime: string;
    cost: number;
}

const Client:FC<ClientProps> = (props) => {

    const [filters, setFilters] = useState<string[]>(['Meals', 'Snacks', 'Gifts', 'Clothes', 'Transport','Entertainment', "Won't use but still buy", 'Misc.']);
    const expenses = props.expense;

    const HandleChange = (filters:string[]) => {
        setFilters(filters);
    }
    
    let expenses_remain:Array<Expense> = []
    expenses.map((expense) => {
        if (filters.includes(expense.type)){
            expenses_remain.push(expense);
        }
    });
  
    return (
      <div className='wrapper'>
        <RemainingBudget budget={props.budget} />
        <Filters handleChange={(filters:string[]) => HandleChange(filters)} filter={filters} />
        <ExpenseTable expenses={expenses_remain}/>
      </div>
    );
  }

export default Client;