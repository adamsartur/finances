import TransactionList from "@/components/Home/TransactionList";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
let sampleData = [
  {
    id: 12,
    amount: 1200,
    type: "out",
    text: "Rent",
    category: "Housing",
    date: 1646761200,
  },
];
// let sampleData = [
//   {
//     id: 12,
//     amount: 1200,
//     type: "out",
//     text: "Rent",
//     category: "Housing",
//     date: 1646761200,
//   },
//   {
//     id: 22,
//     amount: 450,
//     type: "out",
//     text: "Groceries",
//     category: "Food",
//     date: 1646674800,
//   },
//   {
//     id: 32,
//     amount: 35,
//     type: "out",
//     text: "Gas",
//     category: "Transportation",
//     date: 1646588400,
//   },
//   {
//     id: 24,
//     amount: 150,
//     type: "out",
//     text: "Eating out",
//     category: "Food",
//     date: 1646588400,
//   },
//   {
//     id: 54,
//     amount: 200,
//     type: "out",
//     text: "Entertainment",
//     category: "Entertainment",
//     date: 1646502000,
//   },
//   {
//     id: 56,
//     amount: 750,
//     type: "out",
//     text: "Electricity",
//     category: "Housing",
//     date: 1646502000,
//   },
//   {
//     id: 71,
//     amount: 50,
//     type: "out",
//     text: "Gym membership",
//     category: "Health",
//     date: 1646415600,
//   },
//   {
//     id: 58,
//     amount: 1200,
//     type: "in",
//     text: "Salary",
//     category: "Income",
//     date: 1646329200,
//   },
//   {
//     id: 91,
//     amount: 200,
//     type: "out",
//     text: "Shopping",
//     category: "Personal",
//     date: 1646329200,
//   },
//   {
//     id: 140,
//     amount: 250,
//     type: "out",
//     text: "Gas",
//     category: "Transportation",
//     date: 1646242800,
//   },
//   {
//     id: 151,
//     amount: 75,
//     type: "out",
//     text: "Phone bill",
//     category: "Utilities",
//     date: 1646242800,
//   },
//   {
//     id: 125,
//     amount: 1000,
//     type: "in",
//     text: "Freelance work",
//     category: "Income",
//     date: 1646156400,
//   },
//   {
//     id: 163,
//     amount: 500,
//     type: "out",
//     text: "Gift",
//     category: "Gifts",
//     date: 1646156400,
//   },
//   {
//     id: 146,
//     amount: 20,
//     type: "out",
//     text: "Netflix subscription",
//     category: "Entertainment",
//     date: 1646070000,
//   },
//   {
//     id: 135,
//     amount: 800,
//     type: "out",
//     text: "Car payment",
//     category: "Transportation",
//     date: 1646070000,
//   },
//   {
//     id: 136,
//     amount: 150,
//     type: "out",
//     text: "Eating out",
//     category: "Food",
//     date: 1645983600,
//   },
//   {
//     id: 177,
//     amount: 2000,
//     type: "in",
//     text: "Bonus",
//     category: "Income",
//     date: 1645897200,
//   },
//   {
//     id: 158,
//     amount: 300,
//     type: "out",
//     text: "Clothing",
//     category: "Personal",
//     date: 1645897200,
//   },
//   {
//     id: 129,
//     amount: 75,
//     type: "out",
//     text: "Haircut",
//     category: "Personal",
//     date: 1645810800,
//   },
//   {
//     amount: 100,
//     type: "out",
//     text: "Gas",
//     category: "Transportation",
//     date: 1645724400,
//   },
// ];
export default function About() {
  return (
    <div>
      <TransactionList />
    </div>
  );
}

export async function getStaticProps() {
  try {
    const transaction = await prisma.transaction.createMany({
      data: sampleData,
    });
  } catch (error) {
    console.log(error);
  }
  return { props: {} };
}
