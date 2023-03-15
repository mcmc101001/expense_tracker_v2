'use client'

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import Select from 'react-select';


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

const ExpenseCreationForm = () => {
    const router = useRouter();
    
    const [name, setName] = useState('');
    const [cost, setCost] = useState('');
    const [type, setType] = useState('');

    const handleSubmit = async(event:React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        await fetch('/api/expenses/', {
            method : 'POST',
            headers: {
                'Content-Type': 'application/json',
              },
            body: JSON.stringify({
                name: name,
                cost: cost as unknown as number,
                type: type,
            }),
        });

        setName('');
        setCost('');
        setType('');
        router.refresh();
    }

    const handleSelectChange = (e:any) => {
        if (e != null) {
            setType(e.value);
        }
    }

    return (
        <form onSubmit={(e)=>handleSubmit(e)}>
            <h3>Create a new expense</h3>
            <input
                type="text"
                placeholder="Name"
                required
                value = {name}
                id="name"
                onChange={(event) => {setName(event.target.value)}}
            />
            <input
                type="text"
                placeholder="Cost"
                pattern="^\d+(\.)?(\d{0,2}$)"
                title="Please enter a valid number with max two decimal places"
                id="cost"
                value={cost}
                required
                onChange={(event) => {setCost(event.target.value)}}
            />
            <Select
                required={true}
                closeMenuOnSelect={true}
                blurInputOnSelect={true}
                defaultValue={null}
                isMulti={false}
                options={options}
                id="type"
                onChange={(e) => handleSelectChange(e)}
            />
            <button type='submit'>Create expense</button>
        </form>
    );
}

export default ExpenseCreationForm;