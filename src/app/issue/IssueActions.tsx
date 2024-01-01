"use client"
import { Status } from '@prisma/client'
import { PlusIcon } from '@radix-ui/react-icons'
import { Button, Flex, Select } from '@radix-ui/themes'
import Link from 'next/link'
import { useRouter, useSearchParams } from 'next/navigation'
import { StatusFilterItems } from '../types/types'


const IssueActions = () => {
    const searchParams = useSearchParams();
    const router = useRouter();

    const statusList: { label: string, value: StatusFilterItems }[] = [
        { label: "All", value: "all" },
        { label: "Open", value: Status.OPEN },
        { label: "In Progress", value: Status.IN_PROGRESS },
        { label: "Closed", value: Status.CLOSED }];

    const filterByStatus = (status: StatusFilterItems) => {
        const urlSearchParams = new URLSearchParams(searchParams);
        urlSearchParams.set('status', status);
        router.push(`/issue?${urlSearchParams.toString()}`)
    }

    return (
        <Flex justify={"between"}>
            <Select.Root defaultValue={searchParams.get("status") || 'all'} onValueChange={filterByStatus}>
                <Select.Trigger />
                <Select.Content>
                    {statusList.map(({ value, label }) =>
                        <Select.Item key={value} value={value}>
                            {label}
                        </Select.Item>)}
                </Select.Content>
            </Select.Root>
            <Button>
                <PlusIcon width="16" height="16" />
                <Link href={'/issue/new'}>
                    New Issue
                </Link>
            </Button>
        </Flex>
    )
}

export default IssueActions