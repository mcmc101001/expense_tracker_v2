import { FC } from "react";

interface BudgetProps {
    budget: number;
}

const RemainingBudget:FC<BudgetProps>= (props) => {
    return (
        <div className="remaining_budget">
            <p>Remaining budget for month:</p>
            <p>${props.budget}</p>
        </div>
    );
}

export default RemainingBudget;