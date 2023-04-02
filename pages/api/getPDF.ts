import { S3Client, GetObjectCommand } from "@aws-sdk/client-s3";
import { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { S3 } from "aws-sdk";

const getPDF = async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method != "GET") {
        return res.status(405).json({message: "Method not allowed"})
    }
    
    const session = await getServerSession(req, res, authOptions);

    if (!session) {
        res.status(401).json({ message: "You must be logged in." });
        return;
    }

    const s3 = new S3Client({ region: process.env.AWS_REGION as string, 
        credentials: {
            accessKeyId: process.env.AWS_ACCESS_KEY_ID as string,
            secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY as string
        } 
    });
    
    let { name } = req.body;

    const command = new GetObjectCommand({
        Bucket: process.env.AWS_BUCKET_NAME as string,
        Key: name,
    })

    try {
        const data = await s3.send(command);
        console.log(data.Body)
        res.status(200).json({ data });
    } catch (error) {
        console.log(error);
        res.status(500).json({message: "Something went wrong"});
    }
}

