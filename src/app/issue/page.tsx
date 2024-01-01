import prisma from '@p/client'
import { Issue as IssueType, Status } from '@prisma/client'
import { Table, Text } from '@radix-ui/themes'
import Link from 'next/link'
import { IssueStatusBadge } from '../components'
import { Column, StatusFilterItems, orderArray } from '../types/types'
import IssueActions from './IssueActions'
import ColumnTitleComponent from './_components/ColumnTitleComponent'


const Issue = async ({ searchParams }: { searchParams: { status: StatusFilterItems, orderBy: keyof IssueType, direction: typeof orderArray } }) => {
  const status = Object.values(Status).find(status => status === searchParams.status)
  const issues = await prisma.issue.findMany({
    where: { status },
    orderBy: {
      [searchParams.orderBy]: searchParams.direction
    }
  });

  const columns: Column[] = [{
    label: "Title",
    field: "title"
  }, {
    label: "Status",
    field: "status",
    className: "hidden md:table-cell"
  }, {
    label: "Created",
    field: "createdAt",
    className: "hidden md:table-cell"
  }];
  return (
    <div>
      <IssueActions />
      <Table.Root className='mt-5' variant="surface">
        <Table.Header>
          <Table.Row>
            {columns.map(column =>
              <Table.ColumnHeaderCell key={column.label}>
                {
                  <ColumnTitleComponent column={column} />
                }
              </Table.ColumnHeaderCell>
            )}
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
    </div>
  )
}

export default Issue