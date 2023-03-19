import { MouseEvent, useState } from "react";
import { Modal } from "./Modal";
import { NumericFormat } from "react-number-format";
import { convertStringToNumber } from "../../utils/utils";

interface Transaction {
  id: number;
  amount: number;
  type: "in" | "out";
  text: string;
  category: string;
  date: number;
}

interface TransactionFormProps {
  onSave: (transaction: Transaction) => void;
  darkModeProp: boolean;
}

export function TransactionForm({
  onSave,
  darkModeProp,
}: TransactionFormProps) {
  const [darkMode, setDarkMode] = useState(darkModeProp);
  const [text, setText] = useState("");
  const [amount, setAmount] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [category, setCategory] = useState("food");

  function handleIn(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    console.log(amount);

    let amountValue = parseFloat(amount);

    const newTransaction: Transaction = {
      id: Math.floor(Math.random() * 1000000),
      text,
      amount: convertStringToNumber(amount),
      type: "in",
      date: Math.floor(new Date().getTime() / 1000),
      category, // Use the category state
    };

    onSave(newTransaction);

    setText("");
    setAmount("");
    setIsOpen(false);
  }

  function handleOut(event: MouseEvent<HTMLButtonElement, MouseEvent>) {
    event.preventDefault();

    console.log(amount);

    let amountValue = parseFloat(amount);

    const newTransaction: Transaction = {
      id: Math.floor(Math.random() * 1000000),
      text,
      amount: convertStringToNumber(amount),
      type: "out",
      date: Math.floor(new Date().getTime() / 1000),
      category,
    };

    onSave(newTransaction);

    setText("");
    setAmount("");
    setIsOpen(false);
  }
  const categoryOptions = [
    "🏠 House",
    "🏥 Health",
    "📚 Study",
    "💰 Salary",
    "🍔 Food",
    "🚕 Transport",
    "🎉 Entertainment",
    "💸 Income",
  ];

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="bg-blue-500 text-white py-2 px-4 rounded"
      >
        Add Transaction
      </button>
      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
        <form>
          <label className="block mb-2">
            <input
              type="text"
              value={text}
              onChange={(event) => setText(event.target.value)}
              className="block w-full mt-1 py-3 px-4 text-black"
              placeholder="Name of the transaction"
            />
          </label>
          <label className="block mb-2">
            <NumericFormat
              className="block w-full mt-1 mb-3 py-3 px-4 text-black"
              value={amount}
              onChange={(event) => setAmount(event.target.value)}
              prefix="R$"
              thousandSeparator="."
              decimalSeparator=","
              allowNegative
              allowLeadingZeros
              placeholder="R$ 0,00"
            />
          </label>
          <label className="block mb-2">
            <select
              value={category}
              onChange={(event) => setCategory(event.target.value)}
              className="block w-full mt-1 py-3 px-4 text-black"
            >
              {categoryOptions.map((categoryOption) => (
                <option key={categoryOption} value={categoryOption}>
                  {categoryOption}
                </option>
              ))}
            </select>
          </label>

          <button
            onClick={(e: any) => {
              handleIn(e);
            }}
            className={`button bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded w-1/2 dark:bg-white dark:text-black dark:hover:bg-green-700 dark:hover:text-white`}
          >
            Add Income
          </button>
          <button
            onClick={(e: any) => {
              handleOut(e);
            }}
            className={`button bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded w-1/2 dark:bg-white dark:text-black dark:hover:bg-red-700 dark:hover:text-white`}
          >
            Add Expense
          </button>
        </form>
      </Modal>
    </>
  );
}
