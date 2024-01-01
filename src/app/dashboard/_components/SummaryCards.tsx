import { IssueStatusBadge } from '@/app/components';
import prisma from '@p/client';
import { Card, Flex } from '@radix-ui/themes';
import CountUp from './CountUp';

const SummaryCards = async () => {
    const issueNumbers = await prisma.issue.groupBy({
        by: ['status'],
        _count: {
            id: true
        }
    })
    return (
        <Flex gap="2">
            {issueNumbers.map(issueNumber =>
            (<Card key={issueNumber.status}>
                <Flex gap="2" direction="column" align="center">
                    <IssueStatusBadge size="2" status={issueNumber.status} />
                    <CountUp end={issueNumber._count.id} />
                </Flex>
            </Card>)
            )}
        </Flex>
    )
}

export default SummaryCards