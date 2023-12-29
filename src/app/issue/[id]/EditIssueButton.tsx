import { Issue } from '@prisma/client'
import { Pencil2Icon, TrashIcon } from '@radix-ui/react-icons'
import { Button, Flex, Text } from '@radix-ui/themes'
import Link from 'next/link'

const EditIssueButton = ({ issue }: { issue: Issue }) => {
    return (
        <Flex direction="column" gap="3">
            <Button>
                <Link href={`/issue/${issue.id}/edit`}>Edit Issue</Link>
                <Pencil2Icon />
            </Button>
            <Button className="cursor-pointer" color="red">
                <Text>Remove Issue</Text>
                <TrashIcon />
            </Button>
        </Flex>
    )
}

export default EditIssueButton
