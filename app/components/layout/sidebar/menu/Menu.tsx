import { FC } from 'react'

import Line from '@/components/ui/Line/Line'

import styles from './Menu.module.scss'
import MenuItem from './MenuItem'
import { IMenuItem } from './menu.interface'

interface IMenu {
	title: string
	items: IMenuItem[]
	isWhenNoImage?: boolean
}

const Menu: FC<IMenu> = ({ title, items, isWhenNoImage }) => {
	return (
		<nav className={styles.menu_sidebar}>
			<h3>{title}</h3>
			<ul>
				{items.map(mi => (
					<MenuItem
						item={mi}
						key={mi.link}
						isWhenNoImage={isWhenNoImage}
					/>
				))}
			</ul>
			<Line />
		</nav>
	)
}

export default Menu
