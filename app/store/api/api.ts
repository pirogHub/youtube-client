import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react"
import { API_URL } from "api/axios"
import { TypeRootState } from "../store"
import { IUser } from "@/types/user.interface"
import { getUsersPath } from "api/getPaths"

type channelId = number
type isSubscribedNow = boolean

export const api = createApi({
    reducerPath: "api",
    tagTypes: ["Video", "Profile"],
    baseQuery: fetchBaseQuery({
        baseUrl: API_URL,
        prepareHeaders: (headers, { getState }) => {
            const token = (getState() as TypeRootState).auth.accessToken
            if (token) headers.set("Authorization", `Bearer ${token}`)
            return headers
        }
    }),
    endpoints: builder => ({
        getProfile: builder.query<IUser, any>({//query -- для get, mutation -- post put patch, delete.., 
            query: () => getUsersPath('profile'),
            providesTags: () => [{ type: "Profile" }] //{ type: "Profile" } -- чтобы обновлялось всё состояние
        }),
        subscribeToChannel: builder.mutation<isSubscribedNow, channelId>({
            query: (channelId) => ({
                url: getUsersPath(`subscribe/${channelId}`),
                method: "PATCH"
            }),
            invalidatesTags: () => [{ type: "Profile" }] //заново re-fetch
        })
    })
})


