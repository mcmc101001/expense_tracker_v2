import { NextApiRequest, NextApiResponse } from "next"
import { prisma } from "@/lib/prisma";
import { getToken } from "next-auth/jwt";
import { ExpenseType } from "@prisma/client";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";


export default async(req:NextApiRequest, res:NextApiResponse) => {

    const session = await getServerSession(req, res, authOptions);

    if (!session) {
        res.status(401).json({ message: "You must be logged in." });
        return;
    }

    const { user } = session;

    if (req.method === "POST") {
        try {
            const body = req.body;
            const expense = await prisma.expense.deleteMany({
                where: {
                    userId: user.id!,
                    id: body.id,
                },
            })
            return res.status(200).end();
        } catch(error) {
            return res.status(500).end();
        }
    }
}

