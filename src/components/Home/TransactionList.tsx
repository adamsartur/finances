import axios from "axios";

function TransactionList() {
  // const [transactions, setTransactions] = useState<Transaction[]>([]);

  async function handleGetTransactionsClick(
    e: React.MouseEvent<HTMLButtonElement>
  ) {
    e.preventDefault();
    try {
      const response = await axios.get("/api/getTransactionList");
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  }
  return (
    <div className="w-full h-full flex-row">
      <div>
        <button
          onClick={(e) => {
            handleGetTransactionsClick(e);
          }}
        >
          Get Transactions
        </button>
      </div>
    </div>
  );
}
export default TransactionList;
