import { IVideo } from "@/types/video.interface"
import { axiosNotAuth } from "api/axios"
import { getVideoPath } from "api/getPaths"


export const VideoService = {
    async getAll() {
        return axiosNotAuth.get<IVideo[]>(getVideoPath())

    },
    async getVideoById(id: number) {
        return axiosNotAuth.get<IVideo>(getVideoPath(`by-id/${id}`))

    },
    async getMostPopular() {
        return axiosNotAuth.get<IVideo[]>(getVideoPath("most-popular"))

    },
}