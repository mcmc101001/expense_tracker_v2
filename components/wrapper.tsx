'use client'

import RemainingBudget from './RemainingBudget';
import Filters from '@/components/Filters';
import ExpenseTable from '@/components/Expense';
import { useState, FC } from 'react';
import ExpenseCreationForm from './ExpenseCreationForm';
import { Expense } from '@prisma/client';

interface ClientProps {
    budget: number;
    expense: Array<Expense>;
}

const Client:FC<ClientProps> = (props) => {

    const [filters, setFilters] = useState<string[]>(['Meals', 'Snacks', 'Gifts', 'Clothes', 'Transport','Entertainment', "WontUseButStillBuy", 'Misc']);
    const expensesList = props.expense;

    const HandleChange = (filtersList:string[]) => {
        
        let appended_filtersList = filtersList;
        if (filtersList.includes("Won't use but still buy")) {
          appended_filtersList.push("WontUseButStillBuy");
        } 
        if (filtersList.includes("Misc.")){
          appended_filtersList.push("Misc");
        }
        setFilters(appended_filtersList);
    }
    
    let expenses_remain:Array<Expense> = []
    expensesList.map((expense) => {
        if (filters.includes(expense.type)){
            expenses_remain.push(expense);
        }
    });
  
    return (
      <>
        <RemainingBudget budget={props.budget} />
        <Filters handleChange={(filters:string[]) => HandleChange(filters)} filter={filters} />
        <ExpenseTable expenses={expenses_remain}/>
        <ExpenseCreationForm />
      </>
    );
  }

export default Client;