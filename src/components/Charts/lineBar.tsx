import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";
import { Transaction } from "@prisma/client";

// interface Transaction {
//   id: number;
//   amount: number;
//   type: "in" | "out";
//   text: string;
//   category: string;
//   date: number;
// }

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

interface LineBarProps {
  transactionList?: Transaction[];
}

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: "right" as const,
    },
    // title: {
    //   display: true,
    //   text: "Chart.js Line Chart",
    // },
  },
};

const labels = ["January", "February", "March", "April", "May", "June", "July"];

export function LineBar({ transactionList }: LineBarProps) {
  console.log(transactionList);
  const incomingTransactions =
    transactionList?.filter((t) => t.type === "in") || [];
  const outgoingTransactions =
    transactionList?.filter((t) => t.type === "out") || [];

  const datasetIn = incomingTransactions?.map((t) => t.amount / 100) || [];
  const datasetOut = outgoingTransactions?.map((t) => t.amount / 100) || [];
  console.log(datasetIn);

  const data = {
    labels,
    datasets: [
      {
        label: "incomingTransactions",
        data: datasetIn,
        borderColor: "rgb(255, 99, 132)",
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
      {
        label: "outgoingTransactions",
        data: datasetOut,
        borderColor: "rgb(53, 162, 235)",
        backgroundColor: "rgba(53, 162, 235, 0.5)",
      },
    ],
  };

  return <Line options={options} data={data} />;
}
