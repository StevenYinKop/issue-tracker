"use client";
import { ChevronLeftIcon, ChevronRightIcon, DoubleArrowLeftIcon, DoubleArrowRightIcon } from '@radix-ui/react-icons';
import { Button, Flex } from '@radix-ui/themes';
import { useRouter, useSearchParams } from 'next/navigation';

const Pagination = ({ totalPage, total, page, size }: { totalPage: number, total: number, page: number, size: number }) => {
    const searchParams = useSearchParams();
    const router = useRouter();
    const handlePageClick = (nextPage: number) => {
        const urlSearchParams = new URLSearchParams(searchParams);
        urlSearchParams.set("page", nextPage + '');
        router.push(`/issue?${urlSearchParams.toString()}`);
    }
    return (
        <Flex gap="2" align={"center"}>
            Page {page} of {totalPage}
            <Button onClick={() => handlePageClick(1)}
                color='gray'
                variant='soft'
                disabled={page === 1}>
                <DoubleArrowLeftIcon />
            </Button>
            <Button onClick={() => handlePageClick(page - 1)}
                color='gray'
                variant='soft'
                disabled={page === 1}>
                <ChevronLeftIcon />
            </Button>
            <Button onClick={() => handlePageClick(page + 1)}
                color='gray'
                variant='soft'
                disabled={page === totalPage}>
                <ChevronRightIcon />
            </Button>
            <Button onClick={() => handlePageClick(totalPage)}
                color='gray'
                variant='soft'
                disabled={page === totalPage}>
                <DoubleArrowRightIcon />
            </Button>
        </Flex>
    )
}

export default Pagination