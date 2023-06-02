import Link from 'next/link'
import { FC } from 'react'

import { useAuth } from '@/hooks/useAuth'

import { api } from '@/store/api/api'

import styles from './Sidebar.module.scss'
import Menu from './menu/Menu'
import { menu } from './menu/menu.data'

const Sidebar: FC = () => {
	const { user } = useAuth()

	const { data, isLoading } = api.useGetProfileQuery(null, {
		skip: !user
	})

	return (
		<aside className={styles.sidebar}>
			<Link className={styles.logo} href='/'>
				Video Hosting
			</Link>

			<Menu title='Меню' items={menu} />

			{user && (
				<Menu
					title='Мои подписки'
					items={
						data?.subscriptions.map(({ toChannel }) => ({
							image: toChannel.avatarPath,
							title: toChannel.name,
							link: `/c/${toChannel.id}`
						})) || []
					}
				/>
			)}

			<div className={styles.copy}>c в кружке 2023 для портфолио</div>
		</aside>
	)
}

export default Sidebar
