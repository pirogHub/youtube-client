import { MediaService } from "@/services/media/mediaService"
import { useMutation } from "react-query"
import { Dispatch, ChangeEvent, SetStateAction, useState } from "react"
import { errorCatch } from "@/utils/api.utils"
import { toastr } from "react-redux-toastr"
import { AxiosError } from "axios"
import { useTypedSelector } from "@/hooks/useTypedSelector"
import { useAuth } from "@/hooks/useAuth"
export const useUpload = (
    onChange: (...event: any) => void,
    folder?: string,
    setValue?: (val: number) => void,
    setIsChosen?: Dispatch<SetStateAction<boolean>>
) => {
    const { accessToken } = useAuth()

    const [isErrorWhenUpload, setIsErrorWhenUpload] = useState(false)
    const { mutateAsync } = useMutation(
        'upload file',
        (data: FormData) => MediaService.upload(data, accessToken, folder, setValue),
        {
            onSuccess: ({ status, error, response }) => {
                if (status && response && response.data) {

                    setIsErrorWhenUpload(false)
                    onChange(response.data)
                } else {
                    setIsErrorWhenUpload(true)
                    onChange(null)

                    const tmp = error

                    toastr.warning("Ошибка", (error as AxiosError)?.response?.status === 401 ? "Авторизуйтесь, пожалуйста" : "Лимит Бесплатного тарифа базы данных исчерпан :((")
                }
            },
            // onSuccess: ({ data }) => {
            //     setIsErrorWhenUpload(false)
            //     onChange(data)
            // },
            onError: (error: any) => {

            },
        },
    )

    const uploadFile = async (e: ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files
        if (!files?.length) return


        setIsChosen && setIsChosen(true)


        const formData = new FormData()
        formData.append("media", files[0])

        await mutateAsync(formData)
    }

    return {
        uploadFile, isErrorWhenUpload
    }
}