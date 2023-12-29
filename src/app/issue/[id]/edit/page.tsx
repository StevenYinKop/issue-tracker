import Skeleton from '@/app/components/Skeleton';
import prisma from '@p/client';
import dynamic from 'next/dynamic';
import { notFound } from 'next/navigation';

const EditPage = async ({ params }: { params: { id: string } }) => {
  const issue = await prisma.issue.findUnique({
    where: {
      id: parseInt(params.id)
    }
  });
  if (!issue) return notFound();
  const IssueForm = dynamic(() =>
    import('@/app/issue/_components/IssueForm'),
    { ssr: false, loading: () => <Skeleton /> });

  return (
    <IssueForm issue={issue} />
  )
}

export default EditPage