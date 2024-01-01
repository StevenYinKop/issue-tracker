"use client";
import { Bar, CartesianGrid, Legend, BarChart as ReactBarChart, Tooltip, XAxis, YAxis } from 'recharts';
import { ChartType } from '@/app/types/types';
import { Flex, Heading } from '@radix-ui/themes';
import { Separator } from '@radix-ui/react-separator';
const BarChart = ({ data }: { data: ChartType[] }) => {
    return (
        <Flex direction="column" gap="2">
            <Heading>Assignee Summary</Heading>
            <Separator />
            <ReactBarChart width={600} height={730} data={data}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="open" fill="#8884d8" />
                <Bar dataKey="inProgress" fill="#82ca9d" />
            </ReactBarChart>
        </Flex>
    )
}

export default BarChart