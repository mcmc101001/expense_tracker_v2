import { FC } from "react";

interface BudgetProps {
    budget: number;
}

const RemainingBudget:FC<BudgetProps>= (props) => {
    const budget2DP = props.budget.toFixed(2);

    return (
        <div className="remaining_budget">
            <p>Remaining budget for month:</p>
            <p>${budget2DP}</p>
        </div>
    );
}

export default RemainingBudget;