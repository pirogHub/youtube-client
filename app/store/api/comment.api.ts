import { getCommentPath } from "api/getPaths";
import { api } from "./api";
import { IComment, ICommentDto } from "@/types/comment.interface";
// type is
// type 
export const commentApi = api.injectEndpoints({
    endpoints: builder => ({
        createComment: builder.mutation<IComment, ICommentDto>({// т е отдавать будет IComment, а принимать будет ICommentDto
            query: (body) => ({
                url: getCommentPath(),
                method: "POST",
                body
            }),
            invalidatesTags: (result, error, { videoId }) => [{ type: "Video", id: videoId }]
        }),
        deleteComment: builder.mutation<void, number>({
            query: (channelId) => ({
                url: getCommentPath(`${channelId}`),
                method: "DELETE"
            }),
            invalidatesTags: (result, error, videoId) => [{ type: "Video", id: videoId }]
        })
    })
})