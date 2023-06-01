import { IVideo } from "@/types/video.interface"
import { axiosNotAuth } from "api/axios"
import { getVideoPath } from "api/getPaths"


export const VideoService = {
    async getAll() {
        try {
            const { data } = await axiosNotAuth.get<IVideo[]>(getVideoPath())
            return data
        } catch (error) {
            return []
        }
    },
    async getVideoById(id: number) {
        try {
            const { data } = await axiosNotAuth.get<IVideo>(getVideoPath(`by-id/${id}`))
            return data
        } catch (error) {
            return null
        }
    },
    async getMostPopular() {
        try {
            const { data } = await axiosNotAuth.get<IVideo[]>(getVideoPath("most-popular"))
            return data
        } catch (error) {
            return null
        }
    },
}