import { IBase } from './base.interface';
import { IUser } from './user.interface';
import { IVideo } from './video.interface';
export interface ILikes extends IBase {
    fromUser: IUser
    toVideo: IVideo
}
