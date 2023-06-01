import { axiosNotAuth } from "api/axios"
import { IAuthData } from "./auth.helper"
import { getAuthPath } from "api/getPaths"


export const AuthService = {
    async login(email: string, password: string) {
        try {
            const response = await axiosNotAuth.post<IAuthData>(getAuthPath('login'), { email, password })
            return response.data

        } catch (error) {
            return null
        }
    },
    async register(email: string, password: string, name: string) {
        try {
            const response = await axiosNotAuth.post<IAuthData>(getAuthPath('register'), { email, password, name })
            return response.data

        } catch (error) {
            return null
        }
    }
}