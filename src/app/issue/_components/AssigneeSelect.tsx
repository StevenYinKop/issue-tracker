import { Issue, User } from '@prisma/client'
import { Select } from '@radix-ui/themes'
import { useQuery } from '@tanstack/react-query'
import { Skeleton } from '@/app/components';
import axios from 'axios'

const AssigneeSelect = ({ issue }: { issue: Issue }) => {
    // fetch user List
    // const response = await axios.get("/api/users");
    const { data, error, isError, isFetching } =
        useQuery({
            queryKey: ['users'],
            queryFn: () => axios.get<User[]>("/api/users"),
            retry: 3
        });

    const assignUser = async (id: string) => {
        const data = await axios.patch(`/api/issue/${issue.id}`, {
            assignee: id
        })
    }
    return (
        <>
            {isFetching
                ? <Skeleton />
                : (
                    <Select.Root onValueChange={assignUser} defaultValue={issue.assignee || undefined}>
                        <Select.Trigger />
                        <Select.Content>
                            {data?.data.map(user => <Select.Item value={user.id}>{user.name}</Select.Item>)}
                        </Select.Content>
                    </Select.Root>)
            }
        </>
    )
}

export default AssigneeSelect