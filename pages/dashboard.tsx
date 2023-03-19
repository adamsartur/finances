import { useState, useEffect } from "react";
import axios from "axios";
import classNames from "classnames";
import { PrismaClient, Transaction } from "@prisma/client";
import { Card } from "@/components/Card";
import { convertBrl, convertUnix } from "../utils/utils";
import "../src/app/globals.css";
import { CategoryPieChart } from "@/components/Charts/pie";
import { LineBar } from "@/components/Charts/lineBar";
import { TransactionForm } from "@/components/TransactionForm";

// interface TransactionProps {
//   id: number;
//   amount: number;
//   type: "in" | "out";
//   text: string;
//   category: string;
//   date: number;
// }

const prisma = new PrismaClient();
interface TransactionsProps {
  transactions: Transaction[];
}

export default function Dashboard({ transactions }: TransactionsProps) {
  const [darkMode, setDarkMode] = useState(false);
  const [transactionList, setTransactionList] =
    useState<Transaction[]>(transactions);
  const [currentValue, setCurrentValue] = useState(0);
  const [totalOut, setTotalOut] = useState(0);
  const [totalIn, setTotalIn] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    async function loadTheme() {
      try {
        const response = await axios.get("/api/loadTheme");
        const { theme } = response.data;
        setDarkMode(theme === "dark");
        document.body.classList.toggle("dark", theme === "dark");
        setIsLoaded(true);
      } catch (error) {
        console.error(error);
      }
    }
    loadTheme();
  }, []);

  useEffect(() => {
    const currentValue = transactionList.reduce(
      (acc, transaction) =>
        transaction.type === "in"
          ? acc + transaction.amount
          : acc - transaction.amount,
      0
    );
    const totalOut = transactionList
      .filter((transaction) => transaction.type === "out")
      .reduce((acc, transaction) => acc + transaction.amount, 0);
    const totalIn = transactionList
      .filter((transaction) => transaction.type === "in")
      .reduce((acc, transaction) => acc + transaction.amount, 0);
    setCurrentValue(currentValue);
    setTotalOut(totalOut);
    setTotalIn(totalIn);
  }, [transactionList]);

  function toggleDarkMode() {
    setDarkMode(!darkMode);
    document.body.classList.toggle("dark");
  }

  function handleOnSave(newTransaction: Transaction) {
    console.log("saved");
    console.log(newTransaction);
    setTransactionList([newTransaction, ...transactionList]);
  }

  if (!isLoaded) {
    return <div>Loading...</div>;
  }

  return (
    <div
      className={classNames("bg-gray-100", { "dark:bg-gray-800": darkMode })}
    >
      <div className="flex flex-wrap justify-between mb-4">
        <div className="w-full">
          <div className="flex">
            <div className="py-10 px-28 w-2/3">
              <LineBar transactionList={transactionList} />
            </div>
            <div className="p-10 w-1/3">
              <CategoryPieChart transactionList={transactionList} />
            </div>
          </div>
        </div>

        <Card className="bg-gray-50 dark:bg-gray-700 rounded-lg shadow-md flex-1">
          <h3 className="text-lg font-medium text-gray-900 dark:text-white">
            Current Value
          </h3>
          <div
            className={classNames("text-2xl font-bold", {
              "text-green-500": currentValue >= 0,
              "text-red-500": currentValue < 0,
            })}
          >
            {convertBrl(currentValue)}
          </div>
        </Card>
        <Card className="bg-green-50 dark:bg-green-700 rounded-lg shadow-md flex-1 ml-4">
          <h3 className="text-lg font-medium text-gray-900 dark:text-white">
            Total In
          </h3>
          <div className="text-2xl font-bold text-green-500">
            {convertBrl(totalIn)}
          </div>
        </Card>
        <Card className="bg-red-50 dark:bg-red-700 rounded-lg shadow-md flex-1 ml-4">
          <h3 className="text-lg font-medium text-gray-900 dark:text-white">
            Total Out
          </h3>
          <div className="text-2xl font-bold text-red-500">
            {convertBrl(totalOut)}
          </div>
        </Card>
      </div>
      <TransactionForm onSave={handleOnSave} darkModeProp={darkMode} />
      <button
        className={classNames(
          "text-white px-4 py-2 rounded-lg focus:outline-none",
          { "bg-gray-600": !darkMode, "bg-gray-400": darkMode }
        )}
        onClick={toggleDarkMode}
      >
        {darkMode ? "Light Mode" : "Dark Mode"}
      </button>
      {transactionList.length > 0 ? (
        <table className="table-auto w-full mt-8">
          <thead>
            <tr className="bg-gray-200 dark:bg-gray-700">
              <th className="px-4 py-2 text-gray-800 dark:text-white">
                Description
              </th>
              <th className="px-4 py-2 text-gray-800 dark:text-white">
                Amount
              </th>
              <th className="px-4 py-2 text-gray-800 dark:text-white">
                Category
              </th>
              <th className="px-4 py-2 text-gray-800 dark:text-white">Date</th>
            </tr>
          </thead>
          <tbody>
            {transactionList.map((transaction) => (
              <tr
                key={transaction.id}
                className={classNames(
                  "border px-4 py-2 transition-all duration-100 ease-in-out",
                  {
                    "hover:bg-green-700 hover:opacity-70":
                      transaction.type === "in",
                    "hover:bg-red-800 hover:opacity-70":
                      transaction.type === "out",
                  }
                )}
              >
                <td className="border px-4 py-2 capitalize">
                  {transaction.text}
                </td>
                <td
                  className={classNames(
                    "border px-4 py-2 transition-all duration-700 ease-in-out",
                    {
                      "text-green-500": transaction.type === "in",
                      "text-red-500": transaction.type === "out",
                    }
                  )}
                >
                  {convertBrl(transaction.amount)}
                </td>
                <td className="border px-4 py-2 capitalize">
                  {transaction.category}
                </td>
                <td className="border px-4 py-2">
                  {convertUnix(transaction.date)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <div className="text-center mt-8">No transactions yet.</div>
      )}
    </div>
  );
}

export async function getStaticProps() {
  const transactions = await prisma.transaction.findMany();
  console.log(transactions);
  return {
    props: {
      transactions,
    },
  };
}
