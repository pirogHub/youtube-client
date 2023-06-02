import { IUser } from "@/types/user.interface"
import { axiosNotAuth } from "api/axios"
import { getUsersPath } from "api/getPaths"


export const UserService = {
    async getAll() {
        return axiosNotAuth.get<IUser[]>(getUsersPath())

    },
    async getUserById(id: number) {

        return axiosNotAuth.get<IUser>(getUsersPath(`by-id/${id}`))
    }
}