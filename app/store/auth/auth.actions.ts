import { IAuthFields } from "@/components/layout/header/auth-form/auth-form.interface"
import { IAuthData } from "@/services/auth/auth.helper"
import { AuthService } from "@/services/auth/auth.service"
import { toastError } from "@/utils/api.utils"
import { createAsyncThunk } from "@reduxjs/toolkit"
import { toastr } from "react-redux-toastr"

export const register = createAsyncThunk<IAuthData, IAuthFields>(
    "auth/register",
    async ({ email, password }, thunkApi) => {
        try {
            const { data } = await AuthService.register(email, password)

            toastr.success("Регистрация", "Успешно выполнена")
            return data
        } catch (error) {
            toastError(error)
            return thunkApi.rejectWithValue(error)
        }
    }
)

export const login = createAsyncThunk<IAuthData, IAuthFields>(
    "auth/login",
    async ({ email, password }, thunkApi) => {
        try {
            const { data } = await AuthService.login(email, password)

            toastr.success("Вход в систему", "Успешно выполнен")
            return data
        } catch (error) {
            toastError(error)
            return thunkApi.rejectWithValue(error)
        }
    }
)
export const logout = createAsyncThunk(
    "auth/logout",
    async () => { }
)