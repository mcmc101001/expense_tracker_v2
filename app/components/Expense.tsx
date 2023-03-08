import { FC } from "react";

interface Expenses {
    expenses: Array<Expense>;
}

interface Expense {
    id: string;
    name: string;
    type: string;
    datetime: string;
    cost: number;
}

const ExpenseTable:FC<Expenses>= (props) => {

    /**
     * Filtering expenses by date
     */

    return (
        <>
            { 
                props.expenses?.map((expense) => {
                    return <Expense key={expense.id} {...expense} />;
                })
            }
        </>
    );
}

export default ExpenseTable;

const Expense:FC<Expense>= (props) => {
    const time:string = props.datetime;
    return (
        <div className="expense">
            <div className="expense-name">{props.name}</div>
            <div className="expense-cost">-${props.cost}</div>
            <div className="expense-type">{props.type}</div>
            <div className="expense-time">{time}</div>
        </div>
    );
}