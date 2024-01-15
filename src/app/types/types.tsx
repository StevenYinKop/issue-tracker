import { Issue, Status } from "@prisma/client";
import { ArrowDownIcon, ArrowUpIcon } from "@radix-ui/react-icons";
import { colorProp } from "@radix-ui/themes";

export type StatusFilterItems = Status | "all"

export const orderArray = ["", "asc", "desc"];
export const orderIconArray = [null, <ArrowUpIcon key={"arrowup"} />, <ArrowDownIcon key="arrowdown" />];

export type Column = {
    label: string;
    className?: string;
    field: string;
}

export type IssueListSearchParams = {
    status: StatusFilterItems,
    orderBy: keyof Issue,
    direction: typeof orderArray[number],
    page: string,
    size: string
}

export type ChartType = {
    name: string,
    open: number,
    inProgress: number
}

export const defaultColorType = colorProp.default;