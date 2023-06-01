import { axiosNotAuth } from "api/axios"
import { IAuthData } from "./auth.helper"
import { getAuthPath } from "api/getPaths"


export const AuthService = {
    async login(email: string, password: string) {
        return await axiosNotAuth.post<IAuthData>(getAuthPath('login'), { email, password })

    },
    async register(email: string, password: string) {
        return await axiosNotAuth.post<IAuthData>(getAuthPath('register'), { email, password })

    }
}