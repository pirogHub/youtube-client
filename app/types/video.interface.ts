import { IBase } from "./base.interface"
import { IComment } from "./comment.interface"
import { ILikes } from "./likes.interface"
import { IUser } from "./user.interface"

export interface IVideo extends IBase {
    user: IUser
    comments: IComment[]
    name: string
    isPublic?: boolean
    views?: number
    likes: ILikes[]
    duration?: number
    description: string
    videoPath: string
    thumbnailPath: string
}


export interface IVideoDto extends Pick<
    IVideo,
    "id"
    | "thumbnailPath"
    | "description"
    | "name"
    | "videoPath"
    | "isPublic"
> {

}

