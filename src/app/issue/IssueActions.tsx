import { PlusIcon } from '@radix-ui/react-icons'
import { Button } from '@radix-ui/themes'
import Link from 'next/link'
import React from 'react'

const IssueActions = () => {
    return (
        <Button>
            <PlusIcon width="16" height="16" />
            <Link href={'/issue/new'}>
                New Issue
            </Link>
        </Button>
    )
}

export default IssueActions