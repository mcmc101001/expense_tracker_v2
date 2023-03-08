
import Client from './components/wrapper';

async function getExpenses() {
  const res = await fetch('http://127.0.0.1:8090/api/collections/expense/records?page=1&perPage=30', { cache: 'no-store' });
  const data = await res.json();
  return data?.items as any[];
}

export default async function Home() {

  const expenses = await getExpenses();

  const currentDate = new Date();
  const currentMonth = currentDate.getMonth();
  const currentYear = currentDate.getFullYear();
  let budget_remain = 300;

  expenses.forEach((expense) => {
    const expenseDate = new Date(expense.datetime);
    if (expenseDate.getMonth() === currentMonth && expenseDate.getFullYear() === currentYear) {
      budget_remain -= expense.cost;
    }
  })

  return (
    <>
      <Client expense={expenses} budget={budget_remain}/>
    </>
  );
}
