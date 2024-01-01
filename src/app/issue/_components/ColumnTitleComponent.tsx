"use client";
import { Column, orderArray, orderIconArray } from "@/app/types/types";
import { Flex, Text } from "@radix-ui/themes";
import { useRouter, useSearchParams } from "next/navigation";

const ColumnTitleComponent = ({ column }: { column: Column }) => {
    const searchParams = useSearchParams();
    const router = useRouter();
    const direction = searchParams.get("direction") || "";
    const orderBy = searchParams.get("orderBy") || "";

    const changeOrder = () => {
        const urlSearchParams = new URLSearchParams(searchParams);
        const nextDirection = orderArray[(orderArray.indexOf(direction) + 1) % orderArray.length];
        if (nextDirection) {
            urlSearchParams.set("orderBy", column.field)
            urlSearchParams.set("direction", nextDirection);
        } else {
            urlSearchParams.delete("orderBy");
            urlSearchParams.delete("direction");
        }
        router.push(`/issue?${urlSearchParams.toString()}`);
    };

    return (
        <Flex gap="2" align="center">
            <Text className="cursor-pointer" onClick={changeOrder} >
                {column.label}
            </Text>
            {column.field === orderBy ? orderIconArray[orderArray.indexOf(direction) || 0] : null}
        </Flex>
    );
};

export default ColumnTitleComponent