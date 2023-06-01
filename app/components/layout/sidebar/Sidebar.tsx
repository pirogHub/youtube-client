import Link from 'next/link'
import { FC } from 'react'

import styles from './Sidebar.module.scss'
import Menu from './menu/Menu'
import { menu } from './menu/menu.data'

const Sidebar: FC = () => {
	//TODO:: get profile
	return (
		<aside className={styles.sidebar}>
			<Link className={styles.logo} href='/'>
				Video Hosting
			</Link>

			<Menu title='Меню' items={menu} />

			<div className={styles.copy}>c в кружке 2023 для портфолио</div>
		</aside>
	)
}

export default Sidebar
