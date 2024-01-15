import { IssueStatusBadge } from '@/app/components'
import { Issue } from '@prisma/client'
import { Flex, Heading, Link, Text } from '@radix-ui/themes'
import ReactMarkdown from 'react-markdown'
import dayjs from 'dayjs'
import IssueWorkModelBadge from '@/app/components/IssueWorkModelBadge'
import { HomeIcon } from '@radix-ui/react-icons'

const IssueDetails = ({ issue }: { issue: Issue }) => {
    return (
        <Flex gap={"4"} direction="column">
            <Heading><Link target="_blank" href={issue.jobLink}>{issue.title}</Link></Heading>
            <Flex align={"center"} gap={"2"}>
                <Flex gap='2' align='center'><HomeIcon />{issue.location}</Flex>
                <Link target="_blank" href={issue.companyLink}>{issue.company}</Link>
            </Flex>
            <Flex align={"center"} gap="2">
                <IssueStatusBadge size='2' status={issue.status} />
                <IssueWorkModelBadge size='2' workModel={issue.workModel} />
                <Text title={issue.updatedAt.toDateString()} size='2' color='gray' className='ml-3'>{dayjs(issue.updatedAt.toDateString()).fromNow()}</Text>
            </Flex>
            <ReactMarkdown className='prose border rounded-sm px-3 py-5'>{issue.description}</ReactMarkdown>
        </Flex>
    )
}

export default IssueDetails
