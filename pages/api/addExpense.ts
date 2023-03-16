import { NextApiRequest, NextApiResponse } from "next"
import { prisma } from "@/lib/prisma";
import { getToken } from "next-auth/jwt";
import { ExpenseType } from "@prisma/client";

export default async(req:NextApiRequest, res:NextApiResponse) => {
    
    console.log("Recieved API call")
    const token = await getToken({ req })

    if (!token) {
        res.status(401).json({ message: "You must be logged in." });
        return;
    }
    console.log(token);
    const userId = token?.id;
    console.log(userId)

    if (req.method === "POST") {
        console.log(req.body)
        const body = req.body;
        console.log(body.name)
        console.log(body.cost)
        console.log(body.type)
        try {
            const body = req.body;
            const expense = await prisma.expense.create({
                data: {
                    userId: userId!,
                    name: body.name,
                    cost: +body.cost,
                    type: body.type,
                },
            })
            return res.status(200).end();
        } catch(error) {
            console.log("tried!");
            return res.status(500).end();
        }
    } else {
        console.log("not post");
    }
}

