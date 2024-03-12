import { IssueListSearchParams, orderArray } from '@/app/types/types';
import prisma from '@p/client';
import { Status } from '@prisma/client';
import { Flex } from '@radix-ui/themes';
import IssueActions from './IssueActions';
import IssueTable from './_components/IssueTable';
import Pagination from './_components/Pagination';

const Issue = async ({ searchParams }: {
  searchParams: IssueListSearchParams
}) => {
  const page = parseInt(searchParams.page) || 1;
  const size = parseInt(searchParams.size) || 10;
  const status = Object.values(Status).find(status => status === searchParams.status);
  const direction = orderArray.find(direction => direction === searchParams.direction);
  const count = await prisma.issue.count({
    where: { status }
  });
  const totalPage = Math.ceil(count / size);
  const actualPage = Math.min(totalPage, page);
  const issues = await prisma.issue.findMany({
    where: { status },
    orderBy: {
      [searchParams.orderBy]: direction
    },
    skip: (actualPage - 1) * size,
    take: size
  });
  console.log(totalPage)
  return (
    <Flex gap="2" direction={"column"}>
      <IssueActions />
      <IssueTable issues={issues} />
      {totalPage > 1 && <Pagination totalPage={totalPage} total={count} page={actualPage} size={size} />}
    </Flex>
  )
}

export default Issue