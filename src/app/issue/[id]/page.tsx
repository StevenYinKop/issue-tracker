import IssueStatusBadge from '@/app/components/IssueStatusBadge';
import prisma from '@p/client';
import { Box, Button, Flex, Heading, Text } from '@radix-ui/themes';
import delay from 'delay';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import ReactMarkdown from 'react-markdown';

const IssueDetailPage = async ({ params }: { params: { id: string } }) => {
    const issue = await prisma.issue.findUnique({
        where: { id: parseInt(params.id) }
    });
    if (!issue) {
        return notFound();
    }
    await delay(2000)

    return (
        <Flex my="2" >
            <Box className='space-y-4'>
                <Heading>{issue.title}</Heading>
                <Flex align={"center"}>
                    <IssueStatusBadge size='2' status={issue.status}/>
                    <Text className='ml-3'>{issue.updatedAt.toDateString()}</Text>
                </Flex>
                <ReactMarkdown className='prose border rounded-sm px-3 py-5'>{issue.description}</ReactMarkdown>
            </Box>
            <Box>
                <Button>
                    <Link href={`/issue/${issue.id}/edit`}>Edit Issue</Link>
                </Button>
            </Box>

        </Flex>
    )
}

export default IssueDetailPage