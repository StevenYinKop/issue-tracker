import { Issue, Status } from "@prisma/client";
import { ArrowDownIcon, ArrowUpIcon } from "@radix-ui/react-icons";

export type StatusFilterItems = Status | "all"

export const orderArray = ["", "asc", "desc"];
export const orderIconArray = [null, <ArrowUpIcon />, <ArrowDownIcon />];

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