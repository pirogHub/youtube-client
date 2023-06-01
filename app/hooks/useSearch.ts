import { videoApi } from '@/store/api/video.api';
import { useDebounce } from './useDebounce';
import { ChangeEvent, useState } from "react"

export const useSearch = () => {
    const [searchTerm, setSearchTerm] = useState("")
    const debounceSearch = useDebounce(searchTerm, 500)

    const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(e.target.value)
    }

    const { data, isSuccess, isLoading, isError } = videoApi.useGetVideosBySearchTermQuery(debounceSearch, {
        skip: !debounceSearch,
        selectFromResult: ({ data, ...rest }) => ({
            data: data?.slice(0, 4),
            ...rest
        })
    })

    return {
        handleSearch, isError, isLoading, isSuccess, data, searchTerm
    }
}