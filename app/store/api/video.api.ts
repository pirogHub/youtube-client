import { getVideoPath } from "api/getPaths";
import { api } from "./api";
import { IVideo, IVideoDto } from "@/types/video.interface";
// type is
// type 
export const videoApi = api.injectEndpoints({
    endpoints: builder => ({
        getVideosBySearchTerm: builder.query<IVideo[], string>({// т е отдавать будет IVideo, а принимать будет IVideoDto
            query: (searchTerm) => ({ url: getVideoPath(), params: { searchTerm } }),
        }),
        getVideoById: builder.query<IVideo, number>({
            query: (videoId) => ({ url: getVideoPath(), params: { videoId } }),
            providesTags: (result, error, id) => [{ type: "Video", id }] // записываем полученное в тэг Video
        }),
        getPrivateVideo: builder.query<IVideo, number>({
            query: (videoId) => ({ url: getVideoPath(`get-private`), params: { videoId } }),
            providesTags: (result, error, id) => [{ type: "Video", id }]
        }),
        createVideo: builder.mutation<string, void>({
            query: () => ({
                url: getVideoPath(''),
                method: "POST"
            }),
            invalidatesTags: () => [{ type: "Profile" }]
        }),
        updateVideo: builder.mutation<IVideo, IVideoDto>({
            query: (video) => ({
                url: getVideoPath(`${video.id}`),
                method: "PUT",
                body: video
            }),
            invalidatesTags: (result, error, { id }) => [
                { type: "Video", id }
            ]
        }),
        updateCountViews: builder.mutation<IVideo, number>({
            query: (videoId) => ({
                url: getVideoPath(`update-views/${videoId}`),
                method: "PUT"
            }),
            invalidatesTags: (result, error, id) => [{ type: "Video", id }]
        }),
        updateLikes: builder.mutation<IVideo, number>({
            query: (videoId) => ({
                url: getVideoPath(`update-likes/${videoId}`),
                method: "PUT"
            }),
            invalidatesTags: (result, error, id) => [{ type: "Video", id }]
        }),
        deleteVideo: builder.mutation<void, number>({
            query: (videoId) => ({
                url: getVideoPath(`${videoId}`),
                method: "DELETE"
            }),
            invalidatesTags: (result, error, id) => [
                { type: "Video", id },
                { type: "Profile" }
            ]
        })
    })
})