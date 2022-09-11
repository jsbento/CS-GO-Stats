import { NextApiRequest, NextApiResponse } from "next";
import { MongoClient } from "mongodb";
import { Token } from "../../../types/Token";
import CryptoJS from "crypto-js";

const DAY_IN_MS = 86400000;

const decrypt = (password: string) => {
    return CryptoJS.AES.decrypt(password, process.env.CRYPTO_KEY!).toString(CryptoJS.enc.Utf8);
}

const generateToken = (): Token => {
    return {
        token: Math.random().toString(36).substring(2, 15),
        createdAt: new Date(),
        expiresAt: new Date(Date.now() + 2 * DAY_IN_MS)
    }
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== "POST") {
        res.status(405).json({ message: "Method not allowed." });
        return;
    }

    const { username, password } = req.body;
    if (!username || !password) {
        res.status(400).json({ message: "Invalid parameters." });
        return;
    }

    const client = await MongoClient.connect(process.env.MONGODB_URI!);
    const db = client.db();
    const usersCollection = db.collection('users');
    const token = generateToken();

    try {
        const user = await usersCollection.findOne({ username });
        if (!user)
            res.status(404).json({ message: "User not found." });
        else {
            if (decrypt(user.password) === decrypt(password)) {
                const result = await usersCollection.findOneAndUpdate({ username }, { $set: { token } }, {returnDocument: "after"});
                res.status(200).json(result);
            }
            else
                res.status(401).json({ message: "Invalid credentials." });
        }
    } catch (error) {
        res.status(500).json(error);
    } finally {
        await client.close();
    }
}