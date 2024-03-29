import { Box, Flex } from '@radix-ui/themes'
import LatestIssuesTable from './_components/LatestIssuesTable'
import SummaryCards from './_components/SummaryCards'
import BarChart from './_components/BarChart'
import prisma from '@p/client';
import { ChartType } from '../types/types';
import { useQuery } from '@tanstack/react-query';

const fetchChartTypes = async () => {
  const users = await prisma.user.findMany({
    include: {
      issues: {
        where: {
          status: {
            in: ['IN_PROGRESS', 'OPEN']
          }
        }
      }
    },
    orderBy: {
      issues: {
        _count: 'desc'
      }
    },
    take: 10
  });
  const data: ChartType[] = [];
  users.forEach(user => {
    const record = { name: user.name!, open: 0, inProgress: 0 };
    user.issues.forEach(issue => {
      if (issue.status === 'OPEN') record.open++;
      else if (issue.status === 'IN_PROGRESS') record.inProgress++;
    });
    data.push(record);
  })
  return data;
}

const Dashboard = () => {
  const { data } = useQuery<ChartType[]>({
    queryKey: ['dashBoard_table'],
    queryFn: fetchChartTypes,
    retry: 3
  });
  return (
    <Flex gap="4" justify="between">
      <Flex direction="column" gap="2">
        <Box >
          <SummaryCards />
        </Box>
        <Box >
          <LatestIssuesTable />
        </Box>
      </Flex>
      <Box >
        <BarChart data={data!} />
      </Box>
    </Flex >
  )
}

// export const dynamic = "force-dynamic";
export const revalidate = 0;
export default Dashboard