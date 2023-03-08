import React from "react";
import { FC, useState } from "react";
import Image from "next/image";

interface Expenses {
    expenses: Array<Expense>;
}

interface Expense {
    id: string;
    name: string;
    type: string;
    created: string;
    cost: number;
}

const ExpenseTable:FC<Expenses>= (props) => {

    /**
     * Filtering expenses by date
     */

    let currentDate = new Date('December 17, 1995 03:24:00 GMT+0800 (Singapore Standard Time)');


    const expenses_object = props.expenses?.map((expense) => {
        let expenseDate = new Date(expense.created);
        let expenseMonth = expenseDate.getMonth();
        let expenseYear = expenseDate.getFullYear();
        let expenseDay = expenseDate.getDate();
        if (currentDate.getMonth() === expenseMonth && currentDate.getFullYear() === expenseYear && currentDate.getDate() === expenseDay) {
            currentDate = expenseDate;
            return (
                <>
                    <Expense key={expense.id} {...expense} />
                </>
            );
        }
        else {
            currentDate = expenseDate;
            const year = expenseDate.getFullYear();
            let epoch_time = Date.now()
            const date_now = new Date(epoch_time)
            let datestring:string;
            if (date_now.getFullYear() === year) {
                datestring = expenseDate.toLocaleDateString('en-us', { day: 'numeric', month: 'short' });
            }
            else {
                datestring = expenseDate.toLocaleDateString('en-us', { day: 'numeric', month: 'short', year: 'numeric' });
            }
            return (
                <>
                    <h3 key={expense.created}>{datestring}</h3>
                    <Expense key={expense.id} {...expense} />
                </>
            )
        }
    });

    return (
        <>
            <div className="expense-table">
                {expenses_object}
            </div> 
        </>
    );
}

export default ExpenseTable;

const Expense:FC<Expense>= (props) => {

    let expenseDate = new Date(props.created);
    let hours = expenseDate.getHours();
    let formatted_hours = (hours).toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping:false})
    let minutes = expenseDate.getMinutes();
    let formatted_minutes = (minutes).toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping:false})
    let time:string = `${formatted_hours}:${formatted_minutes}`
    let icon;
    switch(props.type) {
        case "Meals":
            icon = <Image
                src="/meals.svg"
                alt="Meals Logo"
                fill
            />
            break;
        case "Snacks":
            icon = <Image
                src="/snacks.svg"
                alt="Snacks Logo"
                fill
            />
            break;
        case "Gifts":
            icon = <Image
                src="/giftssvg"
                alt="Gifts Logo"
                fill
            />
            break;
        case "Entertainment":
            icon = <Image
                src="/entertainment.svg"
                alt="Entertainment Logo"
                fill
            />
            break;
        case "Clothes":
            icon = <Image
                src="/clothes.svg"
                alt="Clothes Logo"
                fill
            />
            break;
        case "Transport":
            icon = <Image
                src="/transport.svg"
                alt="Transport Logo"
                fill
            />
            break;
        case "Misc.":
            icon = <Image
                src="/misc.svg"
                alt="Misc. Logo"
                fill
            />
            break;
        case "Won't use but still buy":
            icon = <Image
                src="/wont-use.svg"
                alt="Won't use Logo"
                fill
            />
            break;
        default:
            icon = <Image
                src="/bug.svg"
                alt="Bug encountered"
                fill
            />
            break;
    }
    return (
        <div className="expense">
            <div className="expense-icon">{icon}</div>
            <div className="expense-name">{props.name}</div>
            <div className="expense-cost">-${props.cost}</div>
            <div className="expense-type">{props.type}</div>
            <div className="expense-time">{time}</div>
        </div>
    );
}