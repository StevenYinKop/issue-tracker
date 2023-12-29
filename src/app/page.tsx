import { Link, Table, Text } from '@radix-ui/themes'
import prisma from '@p/client'
// import Link from 'next/link'

import { IssueStatusBadge } from '@/app/components';
import IssueActions from './issue/IssueActions';

export default async function Home() {
  const issues = await prisma.issue.findMany();
  return (
    <main>
      <IssueActions />
      <Table.Root className='mt-5' variant="surface">
        <Table.Header>
          <Table.Row>
            <Table.ColumnHeaderCell>Title</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell className='hidden md:table-cell'>Status</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell className='hidden md:table-cell'>Created</Table.ColumnHeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {issues.length === 0 && <Table.Row>
            <Table.Cell align="center" colSpan={3}>
              <Text>
                No Data
              </Text>
            </Table.Cell>
          </Table.Row>}
          {issues.map(issue => (
            <Table.Row key={issue.id}>
              <Table.Cell>
                <Link href={`/issue/${issue.id}`}>{issue.title}</Link> {
                <div className='block md:hidden'>
                  <IssueStatusBadge size='1' status={issue.status} />
                </div>
              }</Table.Cell>
              <Table.Cell className='hidden md:table-cell'>
                <IssueStatusBadge size='2' status={issue.status} />
              </Table.Cell>
              <Table.Cell className='hidden md:table-cell'>{issue.createdAt.toLocaleDateString()}</Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Root>
    </main>
  )
}

export const dynamic = 'force-dynamic';