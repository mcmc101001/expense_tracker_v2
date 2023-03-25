import { Expense as ExpenseType } from "@prisma/client";
import Expense from '@/components/Expense';
import { FC } from "react";

interface Expenses {
    expenses: Array<ExpenseType>;
}

const ExpenseTable: FC<Expenses> = (props) => {
    /**
     * Filtering expenses by date
     */

    let currentDate = new Date(
        "December 17, 1995 03:24:00 GMT+0800 (Singapore Standard Time)"
    );

    const expenses_object = props.expenses?.map((expense) => {
        let expenseDate = new Date(expense.created);
        let expenseMonth = expenseDate.getMonth();
        let expenseYear = expenseDate.getFullYear();
        let expenseDay = expenseDate.getDate();
        if (
            currentDate.getMonth() === expenseMonth &&
            currentDate.getFullYear() === expenseYear &&
            currentDate.getDate() === expenseDay
        ) {
            currentDate = expenseDate;
            return (
                <>
                    <Expense key={expense.id} {...expense} />
                </>
            );
        } else {
            currentDate = expenseDate;
            const year = expenseDate.getFullYear();
            let epoch_time = Date.now();
            const date_now = new Date(epoch_time);
            let datestring: string;
            if (date_now.getFullYear() === year) {
                datestring = expenseDate.toLocaleDateString("en-us", {
                    day: "numeric",
                    month: "short",
                });
            } else {
                datestring = expenseDate.toLocaleDateString("en-us", {
                    day: "numeric",
                    month: "short",
                    year: "numeric",
                });
            }

            return (
                <>
                    <h3 key={datestring}>{datestring}</h3>
                    <Expense key={expense.id} {...expense} />
                </>
            );
        }
    });

    return (
        <>
            <div className="w-full">{expenses_object}</div>
        </>
    );
};

export default ExpenseTable;