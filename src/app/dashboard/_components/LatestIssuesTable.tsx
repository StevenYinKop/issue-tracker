import { IssueStatusBadge } from '@/app/components';
import prisma from '@p/client';
import { Card, Flex, Heading, Separator, Table } from '@radix-ui/themes';
import Link from 'next/link';

const LatestIssuesTable = async () => {
    const issues = await prisma.issue.findMany({
        orderBy: {
            updatedAt: "desc"
        },
        take: 10
    })
    return (
        <Card>
            {issues.length > 0 ?
                (<Flex gap="3" direction="column">
                    <Heading>Latest Issues</Heading>
                    <Separator size="4" />
                    <Table.Root>
                        <Table.Body>
                            {issues.map(issue => (<Table.Row key={issue.id}>
                                <Table.Cell>
                                    <Flex direction="column" gap="2" align="start">
                                        <Link href={`/issue/${issue.id}`}>{issue.title}</Link>
                                        <IssueStatusBadge size='1' status={issue.status} />
                                    </Flex>
                                </Table.Cell>
                            </Table.Row>))}
                        </Table.Body>
                    </Table.Root>
                </Flex>
                ) : 'No Data'}
        </Card>
    )
}

export default LatestIssuesTable