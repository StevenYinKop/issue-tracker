import { IssueStatusBadge } from '@/app/components'
import { Issue } from '@prisma/client'
import { Flex, Heading, Text } from '@radix-ui/themes'
import ReactMarkdown from 'react-markdown'

const IssueDetails = ({ issue }: { issue: Issue }) => {
    return (
        <Flex gap={"4"} direction="column">
            <Heading>{issue.title}</Heading>
            <Flex align={"center"} gap="2">
                <IssueStatusBadge size='2' status={issue.status} />
                <Text className='ml-3'>{issue.updatedAt.toDateString()}</Text>
            </Flex>
            <ReactMarkdown className='prose border rounded-sm px-3 py-5'>{issue.description}</ReactMarkdown>
        </Flex>
    )
}

export default IssueDetails
