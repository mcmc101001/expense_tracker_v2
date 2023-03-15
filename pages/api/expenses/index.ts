import { NextApiRequest, NextApiResponse } from "next"
import { getCurrentUser } from "@/lib/session"
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth/next"
import { authOptions } from "@/lib/auth";

const handler = async(req:NextApiRequest, res:NextApiResponse) => {
    
    const session = await getServerSession(req, res, authOptions)
    if (!session) {
        return res.status(403).end()
    }

    const { user } = session

    if (req.method === "POST") {
        const trying = JSON.parse(req.body);
        console.log(trying);
        try {
            const body = JSON.parse(req.body);
            console.log(body);
            const expense = await prisma.expense.create({
                data: {
                    userId: user.id,
                    name: body.name,
                    cost: body.cost as number,
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

export default handler;