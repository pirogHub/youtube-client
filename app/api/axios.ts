import { getContentType } from "@/utils/api.utils"
import axios from "axios"

export const API_URL = `${process.env.APP_SERVER_URL}/api`

export const axiosNotAuth = axios.create({
    baseURL: API_URL,
    headers: getContentType()
})