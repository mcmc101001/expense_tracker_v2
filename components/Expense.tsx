import React from "react";
import { FC } from "react";
import Image from "next/image";
import WontUse from "./svgs/WontUse";
import { Expense } from "@prisma/client";

interface Expenses {
    expenses: Array<Expense>;
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
                    <h3 key={datestring}>{datestring}</h3>
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

    const expenseDate = new Date(props.created);
    const hours = expenseDate.getHours();
    const formatted_hours = (hours).toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping:false})
    const minutes = expenseDate.getMinutes();
    const formatted_minutes = (minutes).toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping:false})
    const time:string = `${formatted_hours}:${formatted_minutes}`
    let icon;
    const cost2DP = props.cost.toFixed(2);

    switch(props.type) {
        case "Meals":
            icon = <Image
                src="/meals.svg"
                alt="Meals Logo"
                fill
                priority
            />
            break;
        case "Snacks":
            icon = <Image
                src="/snacks.svg"
                alt="Snacks Logo"
                fill
                priority
            />
            break;
        case "Gifts":
            icon = <Image
                src="/gifts.svg"
                alt="Gifts Logo"
                fill
                priority
            />
            break;
        case "Entertainment":
            icon = <Image
                src="/entertainment.svg"
                alt="Entertainment Logo"
                fill
                priority
            />
            break;
        case "Clothes":
            icon = <Image
                src="/clothes.svg"
                alt="Clothes Logo"
                fill
                priority
            />
            break;
        case "Transport":
            icon = <Image
                src="/transport.svg"
                alt="Transport Logo"
                fill
                priority
            />
            break;
        case "Misc":
            icon = <Image
                src="/misc.svg"
                alt="Misc. Logo"
                fill
                priority
            />
            break;
        case "WontUseButStillBuy":
            icon = <WontUse />
            break;
        default:
            icon = <Image
                src="/bug.svg"
                alt="Bug encountered"
                fill
                priority
            />
            break;
    }
    return (
        <div id={props.id} className="expense">
            <div className="expense-icon icon-enclose">{icon}</div>
            <div className="expense-name">{props.name}</div>
            <div className="expense-cost">-${cost2DP}</div>
            <div className="expense-type">{props.type}</div>
            <div className="expense-time">{time}</div>
        </div>
    );
}