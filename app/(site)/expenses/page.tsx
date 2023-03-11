import { prisma } from '../../api/prisma/prisma';
import Client from './components/wrapper';

async function getExpenses() {
  const res = await prisma.expense.findMany({
    select: {
      id: true,
      name: true,
      type: true,
      created: true,
      cost: true,
      },
  });
  return res;
}

export default async function Home() {

  const expenses = await getExpenses();

  const currentDate = new Date();
  const currentMonth = currentDate.getMonth();
  const currentYear = currentDate.getFullYear();
  let budget_remain = 300;

  expenses.forEach((expense) => {
    const expenseDate = expense.created;
    if (expenseDate.getMonth() === currentMonth && expenseDate.getFullYear() === currentYear) {
      budget_remain -= expense.cost;
    }
  })

  return (
      <Client expense={expenses} budget={budget_remain}/>
  );
}
