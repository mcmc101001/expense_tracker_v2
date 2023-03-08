'use client'

import { FC } from "react";
import makeAnimated from 'react-select/animated';
import Select from "react-select";

interface Filters {
    filter: Array<string>;
    handleChange: (filters:string[]) => void;
}

const animatedComponents = makeAnimated();

const RemainingBudget:FC<Filters>= (props) => {

    const options = [
        { value: 'Meals', label:'Meals'},
        { value: 'Snacks', label:'Snacks'},
        { value: 'Gifts', label:'Gifts'},
        { value: 'Clothes', label:'Clothes'},
        { value: 'Transport', label:'Transport'},
        { value: 'Entertainment', label:'Entertainment'},
        { value: "Won't use but still buy", label:"Won't use but still buy"},
        { value: 'Misc.', label:'Misc.'},
    ]

    return (
        <div className="select">
                <Select
            closeMenuOnSelect={false}
            components={animatedComponents}
            defaultValue={options}
            isMulti
            options={options}
            onChange={(e) => props.handleChange(e.map((item) => item.value))}
            />
        </div>
    );
}

export default RemainingBudget;