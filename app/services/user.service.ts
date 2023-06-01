import { IUser } from "@/types/user.interface"
import { axiosNotAuth } from "api/axios"
import { getUsersPath } from "api/getPaths"


export const UserService = {
    async getAll() {
        try {
            const { data } = await axiosNotAuth.get<IUser[]>(getUsersPath())
            return data
        } catch (error) {
            return []
        }
    },
    async getUserById(id: number) {
        try {
            const { data } = await axiosNotAuth.get<IUser>(getUsersPath(`by-id/${id}`))
            return data
        } catch (error) {
            return null
        }
    },
}