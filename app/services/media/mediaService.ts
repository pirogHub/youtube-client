import { axiosNotAuth } from "api/axios"
import { IMediaResponse } from "./media.interface"
import { getMediaPath } from "api/getPaths"
import { AxiosProgressEvent } from "axios"

export const MediaService = {
    async upload(media: FormData, accessToken = "", folder?: string, setValue?: (val: number) => void) {

        try {
            const response = await axiosNotAuth.post<IMediaResponse>(getMediaPath(), media, {
                params: { folder },
                headers: {
                    'Content-Type': "multipart/form-data",
                    "Authorization": `Bearer ${accessToken}`
                },
                onUploadProgress: (progressEvent: AxiosProgressEvent) => {
                    if (setValue) {
                        const progress = progressEvent.total ? (progressEvent.loaded / progressEvent.total) * 100 : 80
                        setValue(Math.ceil(progress))
                    }
                }
            })
            return { status: true, response }
        } catch (error) {
            return { status: false, error }

        }



    }
}