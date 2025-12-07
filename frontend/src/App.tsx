import "./App.css";
import { useTotalSpent } from "./apis/useTotalSpent";

function App() {
  const totalSpentQuery = useTotalSpent();

  if (totalSpentQuery.isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <div>Total spent: {totalSpentQuery.data?.total ?? 0}</div>
    </>
  );
}

export default App;
