import { PrismaClient } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";

const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    const transactions = await prisma.transaction.findMany();
    res.status(200).json(transactions);
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}
