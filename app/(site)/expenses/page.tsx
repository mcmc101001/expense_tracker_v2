import { getCurrentUser } from '@/lib/session';
import { redirect } from 'next/navigation';
import { prisma } from '@/lib/prisma';
import Client from '@/components/wrapper';
import { authOptions } from '@/lib/auth';

async function getExpenses(sessionUserId: string ) {
  const res = await prisma.expense.findMany({
    select: {
      id: true,
      name: true,
      type: true,
      created: true,
      cost: true,
      userId: true,
      },
    where: {
      userId: sessionUserId,
    },
    orderBy: {
      created: 'desc',
    }
  });
  return res;
}

export default async function Home() {

  const user = await getCurrentUser();
  if (!user) {
    redirect(authOptions?.pages?.signIn || "api/auth/signin");
  }
  else{
    let expenses = await getExpenses(user.id);
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

    //convert Date object to string
    expenses = JSON.parse(JSON.stringify(expenses));

    return (
        <Client expense={expenses} budget={budget_remain}/>
    );
  }
}
