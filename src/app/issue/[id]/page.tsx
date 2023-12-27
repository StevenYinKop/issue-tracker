import prisma from '@p/client';
import { Text } from '@radix-ui/themes';
import { notFound } from 'next/navigation';

const IssueDetailPage = async ({ params }: { params: { id: string } }) => {
    const issue = await prisma.issue.findUnique({
        where: {id: parseInt(params.id)}
    });
    if (!issue) {
        return notFound();
    }

    return (
        <div>
            <Text>{issue.title}</Text>
            <Text>{issue.status}</Text>
            <Text>{issue.updatedAt.toDateString()}</Text>
            <Text>{issue.description}</Text>
            
        </div>
    )
}

export default IssueDetailPage