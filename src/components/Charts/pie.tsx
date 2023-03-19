import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

interface Transaction {
  id: number;
  amount: number;
  type: "in" | "out";
  text: string;
  category: string;
  date: number;
}

interface CategoryPieChartProps {
  transactionList?: Transaction[];
}

export const CategoryPieChart = ({
  transactionList,
}: CategoryPieChartProps) => {
  const categories =
    transactionList?.reduce((acc, t) => {
      if (acc.indexOf(t.category) === -1) {
        acc.push(t.category);
      }
      return acc;
    }, [] as string[]) || [];
  const colors = [
    "#FF6384",
    "#36A2EB",
    "#FFCE56",
    "#33FF99",
    "#FF5733",
    "#9966FF",
    "#33CCFF",
    "#FF33CC",
    "#99FF33",
    "#FF9933",
  ].slice(0, categories.length);

  const pieData = {
    type: "pie",
    data: {
      labels: categories,
      datasets: [
        {
          data: categories.map(
            (category) =>
              transactionList?.reduce((sum, t) => {
                if (t.category === category) {
                  sum += t.amount;
                }
                return sum;
              }, 0) || 0
          ),
          backgroundColor: colors,
          hoverBackgroundColor: colors,
        },
      ],
    },
    options: {
      responsive: true,
      plugins: {
        legend: {
          display: true,
          position: "right" as "right",
        },
      },
    },
  };

  return <Pie data={pieData.data} options={pieData.options} />;
};
