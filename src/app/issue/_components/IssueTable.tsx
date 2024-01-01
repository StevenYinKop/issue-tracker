import { IssueStatusBadge } from "@/app/components";
import { Column } from "@/app/types/types";
import { Issue } from "@prisma/client";
import { Link, Table, Text } from "@radix-ui/themes";
import ColumnTitleComponent from "./ColumnTitleComponent";

const IssueTable = ({ issues }: { issues: Issue[] }) => {

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
        <>
            <Table.Root variant="surface">
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
        </>
    )
}

export default IssueTable