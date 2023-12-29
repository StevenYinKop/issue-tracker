import Skeleton from '@/app/components/Skeleton';
import dynamic from 'next/dynamic';

const NewIssue = () => {
  const IssueForm = dynamic(() =>
    import('@/app/issue/_components/IssueForm'),
    { ssr: false, loading: () => <Skeleton />});

  return (<IssueForm />);
}

export default NewIssue