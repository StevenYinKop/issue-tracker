import { Status } from "@prisma/client"
import { Badge } from "@radix-ui/themes"

const statusRecord: Record<Status, { label: string, color: 'crimson' | 'grass' | 'gray' }> = {
    OPEN: { label: 'open', color: 'crimson' },
    IN_PROGRESS: { label: 'in progress', color: 'grass' },
    CLOSED: { label: 'closed', color: 'gray' }
};

const IssueStatusBadge = ({status, size}: {status: Status, size: "1" | "2"}) => {
    return (
        <Badge size={size} color={statusRecord[status].color}>
            {statusRecord[status].label}
        </Badge>
    )
}

export default IssueStatusBadge