import { useInfiniteQuery, useQuery } from "@tanstack/react-query"
import { fetchOpportunities, fetchTab } from "../mockApi"

export const useOpportunities = () => {
    const { data, fetchNextPage, hasNextPage, isFetchingNextPage, status } = useInfiniteQuery({
        queryKey: ['opportunities'],
        queryFn: ({ pageParam }) => fetchOpportunities({ cursor: pageParam }),
        initialPageParam: 'page_1',
        getNextPageParam: (lastPage) => lastPage.nextCursor
    })
    
    return {
        opportunities: data?.pages.flatMap((page) => page.data) ?? [],
        fetchNextPage,
        hasNextPage,
        isFetchingNextPage,
        status
    }
}

export const useGetTab = () => {
    const { data, isLoading } = useQuery({
        queryKey: ['tab'],
        queryFn: fetchTab
    })
    
    return {
        tabs: data?.data ?? [],
        isLoading
    }
}