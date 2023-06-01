import { FC } from 'react'

import styles from './Header.module.scss'
import IconsRight from './icons-right/IconsRight'
import Search from './search/Search'

const Header: FC = () => {
	return (
		<header className={styles.header}>
			<Search />
			<IconsRight />
		</header>
	)
}

export default Header
