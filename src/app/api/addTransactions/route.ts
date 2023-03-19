import { PrismaClient } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";

const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    console.log("hello");
    let sampleData = [
      {
        id: 1,
        amount: 1200,
        type: "out",
        text: "Rent",
        category: "Housing",
        date: 1646761200,
      },
      {
        id: 2,
        amount: 450,
        type: "out",
        text: "Groceries",
        category: "Food",
        date: 1646674800,
      },
      {
        id: 3,
        amount: 35,
        type: "out",
        text: "Gas",
        category: "Transportation",
        date: 1646588400,
      },
      {
        id: 4,
        amount: 150,
        type: "out",
        text: "Eating out",
        category: "Food",
        date: 1646588400,
      },
      {
        id: 5,
        amount: 200,
        type: "out",
        text: "Entertainment",
        category: "Entertainment",
        date: 1646502000,
      },
      {
        id: 6,
        amount: 750,
        type: "out",
        text: "Electricity",
        category: "Housing",
        date: 1646502000,
      },
      {
        id: 7,
        amount: 50,
        type: "out",
        text: "Gym membership",
        category: "Health",
        date: 1646415600,
      },
      {
        id: 8,
        amount: 1200,
        type: "in",
        text: "Salary",
        category: "Income",
        date: 1646329200,
      },
      {
        id: 9,
        amount: 200,
        type: "out",
        text: "Shopping",
        category: "Personal",
        date: 1646329200,
      },
      {
        id: 10,
        amount: 250,
        type: "out",
        text: "Gas",
        category: "Transportation",
        date: 1646242800,
      },
      {
        id: 11,
        amount: 75,
        type: "out",
        text: "Phone bill",
        category: "Utilities",
        date: 1646242800,
      },
      {
        id: 12,
        amount: 1000,
        type: "in",
        text: "Freelance work",
        category: "Income",
        date: 1646156400,
      },
      {
        id: 13,
        amount: 500,
        type: "out",
        text: "Gift",
        category: "Gifts",
        date: 1646156400,
      },
      {
        id: 14,
        amount: 20,
        type: "out",
        text: "Netflix subscription",
        category: "Entertainment",
        date: 1646070000,
      },
      {
        id: 15,
        amount: 800,
        type: "out",
        text: "Car payment",
        category: "Transportation",
        date: 1646070000,
      },
      {
        id: 16,
        amount: 150,
        type: "out",
        text: "Eating out",
        category: "Food",
        date: 1645983600,
      },
      {
        id: 17,
        amount: 2000,
        type: "in",
        text: "Bonus",
        category: "Income",
        date: 1645897200,
      },
      {
        id: 18,
        amount: 300,
        type: "out",
        text: "Clothing",
        category: "Personal",
        date: 1645897200,
      },
      {
        id: 19,
        amount: 75,
        type: "out",
        text: "Haircut",
        category: "Personal",
        date: 1645810800,
      },
      {
        id: 20,
        amount: 100,
        type: "out",
        text: "Gas",
        category: "Transportation",
        date: 1645724400,
      },
    ];
    try {
      const transaction = await prisma.transaction.createMany({
        data: sampleData,
      });
    } catch (error) {
      console.log(error);
    }
    res.status(200).json("success");
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}
