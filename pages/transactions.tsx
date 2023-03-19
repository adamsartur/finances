import { PrismaClient, Transaction } from "@prisma/client";
import { convertBrl, convertUnix } from "../utils/utils";
import { useEffect, useState } from "react";
import classNames from "classnames";
import "../src/app/globals.css";
import { TransactionForm } from "@/components/TransactionForm";
import { Card } from "@/components/Card";
import axios from "axios";

const prisma = new PrismaClient();

interface TransactionsProps {
  transactions: Transaction[];
}

interface DarkModeToggleProps {
  darkMode: boolean;
  toggleDarkMode: () => void;
}

interface CardProps {
  title: string;
  value: string;
  color: string;
}

function DarkModeToggle({ darkMode, toggleDarkMode }: DarkModeToggleProps) {
  return (
    <button
      className="bg-gray-300 dark:bg-gray-700 px-4 py-2 rounded-lg text-white"
      onClick={toggleDarkMode}
    >
      {darkMode ? "Light Mode" : "Dark Mode"}
    </button>
  );
}

export default function Transactions({ transactions }: TransactionsProps) {
  const [darkMode, setDarkMode] = useState(false);
  const [transactionList, setTransactionList] = useState(transactions);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    async function loadTheme() {
      console.log("Loading theme...");
      try {
        const response = await axios.get("/api/loadTheme");
        console.log("Loading theme...");
        const { theme } = response.data;
        console.log(theme);
        setDarkMode(theme === "dark");
        document.body.classList.toggle("dark", theme === "dark");
        setIsLoaded(true);
      } catch (error) {
        console.error(error);
      }
    }

    loadTheme();
  }, []);

  if (!isLoaded) {
    return <div>Loading...</div>;
  }

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

  function toggleDarkMode() {
    setDarkMode(!darkMode);
    document.body.classList.toggle("dark");
  }

  function handleOnSave(newTransaction: Transaction) {
    console.log("saved");
    console.log(newTransaction);
    setTransactionList([newTransaction, ...transactionList]);
  }

  return (
    <div
      className={classNames("bg-gray-100 ", { "dark:bg-gray-800": darkMode })}
    >
      <div className="flex flex-wrap justify-between">
        <Card className=" bg-gray-50 dark:bg-gray-700 rounded-lg shadow-md mb-4 flex-1">
          <h3 className="text-lg font-medium text-gray-900 dark:text-white">
            Current Value
          </h3>
          <div
            className={classNames("text-2xl font-bold", {
              "text-green-500": currentValue >= 0,
              "text-red-500": currentValue < 0,
              "dark:text-green-300": currentValue >= 0 && darkMode,
              "dark:text-red-300": currentValue < 0 && darkMode,
            })}
          >
            {convertBrl(Math.abs(currentValue))}
            <span className="text-base font-medium text-gray-500 dark:text-gray-400">
              {" "}
              ({currentValue >= 0 ? "profit" : "loss"})
            </span>
          </div>
        </Card>
        <Card className=" bg-red-500 rounded-lg shadow-md mb-4 flex-1">
          <h3 className="text-lg font-medium text-white">Total Out</h3>
          <div className="text-2xl font-bold text-white">
            {convertBrl(totalOut)}
          </div>
        </Card>
        <Card className=" bg-green-500 rounded-lg shadow-md mb-4 flex-1">
          <h3 className="text-lg font-medium text-white">Total In</h3>
          <div className="text-2xl font-bold text-white">
            {convertBrl(totalIn)}
          </div>
        </Card>
      </div>

      <TransactionForm onSave={handleOnSave} darkModeProp={darkMode} />
      <DarkModeToggle darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
      <h1 className="text-3xl font-bold mb-4">Transactions</h1>
      {transactionList.map((transaction) => (
        <ul
          key={transaction.id}
          className={classNames(
            "bg-white dark:bg-gray-700 p-4 mb-4 rounded-lg shadow-md",
            { "shadow-lg": darkMode }
          )}
        >
          <li className="font-bold flex justify-between">
            {transaction.text}
            <span className="">{convertUnix(transaction.date)}</span>
          </li>
          <li
            className={classNames("font-bold", {
              "text-green-500": transaction.type === "in",
              "text-red-500": transaction.type === "out",
              "dark:text-green-300": transaction.type === "in" && darkMode,
              "dark:text-red-300": transaction.type === "out" && darkMode,
            })}
          >
            {convertBrl(transaction.amount)}
          </li>
        </ul>
      ))}
    </div>
  );
}

export async function getStaticProps() {
  const transactions = await prisma.transaction.findMany();
  return {
    props: {
      transactions,
    },
  };
}
