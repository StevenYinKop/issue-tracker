import prisma from '@p/client';
import { Box, Flex } from '@radix-ui/themes';
import { notFound } from 'next/navigation';
import EditIssueButton from './EditIssueButton';
import IssueDetails from './IssueDetails';
import { getServerSession } from 'next-auth';


const IssueDetailPage = async ({ params }: { params: { id: string } }) => {
    const session = await getServerSession()
    const issue = await prisma.issue.findUnique({
        where: { id: parseInt(params.id) }
    });
    if (!issue) {
        return notFound();
    }
    return (
        <Flex my="2" justify={{ md: "between", sm: "center" }} direction={{ initial: "column", sm: "row" }} gap="4" >
            <Box>
                <IssueDetails issue={issue} />
            </Box>
            <Box>
                {!!session?.user && <EditIssueButton issue={issue} />}
            </Box>
        </Flex>
    )
}

export default IssueDetailPage