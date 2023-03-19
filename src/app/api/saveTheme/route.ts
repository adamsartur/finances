import { PrismaClient } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";

const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const { theme } = req.body;
    console.log(theme);
    const transaction = await prisma.userTransaction.update({
      where: {
        id: 1,
      },
      data: {
        theme,
      },
    });
    res.status(200).json(transaction);
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}
