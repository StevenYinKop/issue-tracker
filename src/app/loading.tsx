import { Skeleton } from '@/app/components';
import { Table } from '@radix-ui/themes';
import IssueActions from './issue/IssueActions';

const LoadingIssuePage = () => {
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
                    {[1, 2, 3, 4, 5].map(index => (
                        <Table.Row key={index}>
                            <Table.Cell><Skeleton /></Table.Cell>
                            <Table.Cell className='hidden md:table-cell'>
                                <Skeleton />
                            </Table.Cell>
                            <Table.Cell className='hidden md:table-cell'><Skeleton /></Table.Cell>
                        </Table.Row>
                    ))}
                </Table.Body>
            </Table.Root>
        </main>
    )
}

export default LoadingIssuePage