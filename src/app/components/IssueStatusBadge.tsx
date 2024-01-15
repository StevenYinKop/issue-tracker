import { Status } from "@prisma/client"
import { Badge } from "@radix-ui/themes"
import { defaultColorType } from "../types/types";

const statusRecord: Record<Status, { label: string, color: typeof defaultColorType }> = {
    OPEN: { label: 'open', color: 'crimson' },
    IN_PROGRESS: { label: 'in progress', color: 'grass' },
    VIEWED: { label: 'viewed', color: 'mint' },
    REJECTED: { label: 'rejected', color: 'lime' },
    PHONE_SCREEN: { label: 'hr', color: 'amber' },
    TECHNICAL_INTERVIEW: { label: 'Tech', color: 'amber' },
    BEHAVIOR_INTERVIEW: { label: 'behavior', color: 'sky' },
};

const IssueStatusBadge = ({status, size}: {status: Status, size: "1" | "2"}) => {
    return (
        <Badge size={size} color={statusRecord[status].color}>
            {statusRecord[status].label}
        </Badge>
    )
}

export default IssueStatusBadge