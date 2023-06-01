import { FC } from 'react'

import Line from '@/components/ui/Line/Line'

import styles from './Menu.module.scss'
import MenuItem from './MenuItem'
import { IMenuItem } from './menu.interface'

interface IMenu {
	title: string
	items: IMenuItem[]
}

const Menu: FC<IMenu> = ({ items, title }) => {
	return (
		<nav className={styles.menu_sidebar}>
			<h3>{title}</h3>
			<ul>
				{items.map(mi => (
					<MenuItem item={mi} key={mi.link} />
				))}
			</ul>
			<Line />
		</nav>
	)
}

export default Menu
