import { getCurrentUser } from '@/lib/session';
import { redirect } from 'next/navigation';
import { prisma } from '@/lib/prisma';
import { authOptions } from '@/lib/auth';
import ResumeUploader from '@/components/ResumeUploader';
import PDFViewer from '@/components/ResumeViewer';

/*
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
*/

export default async function Home() {

  const user = await getCurrentUser();
  if (!user) {
    redirect(authOptions?.pages?.signIn || "api/auth/signin");
  }
  else{
    return (
        <>
          < ResumeUploader />
          < PDFViewer url="https://expense-tracker-v2.s3.ap-southeast-1.amazonaws.com/T04Ans.pdf" />
        </>
    );
  }
}
