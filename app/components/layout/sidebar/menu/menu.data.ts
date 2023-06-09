import { IMenuItem } from "./menu.interface";
import { HiChartBar, HiCollection, HiHome, HiStar } from "react-icons/hi"

export const menu: IMenuItem[] = [
    {
        title: "Главная",
        icon: HiHome,
        link: "/"
    },
    {
        title: "Тренды",
        icon: HiChartBar,
        link: "/trending"
    },
    {
        title: "Мой канал",
        icon: HiStar,
        link: "/my-channel",
        isAuthBlock: true
    },
    {
        title: "Мои подписки",
        icon: HiCollection,
        link: "/subscribers"
    },
]