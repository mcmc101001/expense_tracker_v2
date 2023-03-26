"use client";

import React from "react";
import { FC } from "react";
import Image from "next/image";
import WontUse from "./svgs/WontUse";
import { Expense } from "@prisma/client";
import Bug from "./svgs/Bug";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";

const Expense: FC<Expense> = (props) => {
    const router = useRouter();

    const expenseDate = new Date(props.created);
    const hours = expenseDate.getHours();
    const formatted_hours = hours.toLocaleString("en-US", {
        minimumIntegerDigits: 2,
        useGrouping: false,
    });

    const minutes = expenseDate.getMinutes();
    const formatted_minutes = minutes.toLocaleString("en-US", {
        minimumIntegerDigits: 2,
        useGrouping: false,
    });
    const time: string = `${formatted_hours}:${formatted_minutes}`;
    let icon;
    const cost2DP = props.cost.toFixed(2);

    switch (props.type) {
        case "Meals":
            icon = <Image src="/meals.svg" alt="Meals Logo" fill priority />;
            break;
        case "Snacks":
            icon = <Image src="/snacks.svg" alt="Snacks Logo" fill priority />;
            break;
        case "Gifts":
            icon = <Image src="/gifts.svg" alt="Gifts Logo" fill priority />;
            break;
        case "Entertainment":
            icon = (
                <Image
                    src="/entertainment.svg"
                    alt="Entertainment Logo"
                    fill
                    priority
                />
            );
            break;
        case "Clothes":
            icon = (
                <Image src="/clothes.svg" alt="Clothes Logo" fill priority />
            );
            break;
        case "Transport":
            icon = (
                <Image
                    src="/transport.svg"
                    alt="Transport Logo"
                    fill
                    priority
                />
            );
            break;
        case "Misc":
            icon = <Image src="/misc.svg" alt="Misc. Logo" fill priority />;
            break;
        case "WontUseButStillBuy":
            icon = <WontUse />;
            break;
        default:
            icon = <Bug />;
            break;
    }

    const handleDelete = async (e: React.MouseEvent<HTMLAnchorElement>) => {
        e.preventDefault();
        const expense_id = e.currentTarget.id;

        await fetch("/api/deleteExpense", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                id: expense_id,
            }),
        });

        router.refresh();
        toast.success("Expense Deleted!")
    };

    return (
        <div className="grid grid-cols-6 grid-flow-row gap-4 opacity-95 justify-center p-2 text-slate-100 text-sm md:text-3xl">
            <div className="row-span-2 rounded-3xl flex items-center justify-center bg-slate-200 relative object-contain aspect-square">
                {icon}
            </div>
            <div className="flex items-center font-bold col-span-2 row-span-1">{props.name}</div>
            <div className="flex items-center justify-end font-bold col-span-2 row-span-1">-${cost2DP}</div>
            <div className="expense-delete cursor-pointer relative col-span-1 row-span-2">
                <a id={props.id} onClick={(e) => handleDelete(e)}>
                    <div className="trash"></div>
                    <div className="trash-top"></div>
                    <div className="trash-btm">
                        <div className="trash-lines">
                            <div className="trash-line"></div>
                            <div className="trash-line"></div>
                        </div>
                    </div>
                </a>
                </div>
            <div className="flex items-center font-bold col-span-2 row-span-1">{props.type}</div>
            <div className="flex items-center justify-end font-bold col-span-2 row-span-1">{time}</div>
        </div>
    );
};

export default Expense;
