import { IBase } from "./base.interface"
import { ISubscription } from "./subscription.interface"
import { IVideo } from "./video.interface"

export interface IUser extends IBase {
    email: string
    name: string
    isVerified?: string
    subscribersCount: number
    description: string
    avatarPath: string
    videos?: IVideo[]
    subscriptions: ISubscription[]
    // subscribers: ISubscription[]
    // comments: IComment[]
    // likes: ILikes[]


}