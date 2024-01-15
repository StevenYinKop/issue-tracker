import { WorkModel } from '@prisma/client';
import { Badge } from '@radix-ui/themes'
import { defaultColorType } from '../types/types';

const workModelRecord: Record<WorkModel, { label: string, color: typeof defaultColorType }> = {
    HYBRID: {
        label: 'hybrid',
        color: 'pink'
    },
    REMOTE: {
        label: 'remote',
        color: 'grass'
    },
    ON_SITE: {
        label: 'on-site',
        color: 'violet'
    },
};


const IssueWorkModelBadge = ({workModel, size}: {workModel: WorkModel, size: "1" | "2"}) => {
    return (
        <Badge size={size} color={workModelRecord[workModel].color}>
            {workModelRecord[workModel].label}
        </Badge>
    )
}

export default IssueWorkModelBadge;