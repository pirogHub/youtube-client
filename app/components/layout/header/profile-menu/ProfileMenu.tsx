import Image from 'next/image'
import Link from 'next/link'
import { FC } from 'react'
import { GoChevronDown, GoChevronUp } from 'react-icons/go'

import { useActions } from '@/hooks/useActions'
import { useAuth } from '@/hooks/useAuth'
import { useClosedClickOutside } from '@/hooks/useClosedClickOutside'

import { api } from '@/store/api/api'

import styles from './ProfileMenu.module.scss'

const ProfileMenu: FC = () => {
	const { user } = useAuth()

	const { data, isLoading } = api.useGetProfileQuery(null, {
		skip: !user
	})

	const { isShow, ref, setIsShow } = useClosedClickOutside(false)
	const { logout } = useActions()

	if (isLoading) return null

	return (
		<div ref={ref} className={styles.wrapper}>
			<button onClick={() => setIsShow(!isShow)}>
				<Image
					src={data?.avatarPath || ''}
					alt={data?.name || ''}
					width={40}
					height={40}
					priority
				/>
				<span className={styles.name}>{data?.name}</span>
				{isShow ? <GoChevronUp /> : <GoChevronDown />}
			</button>

			{isShow && (
				<div className={styles['profile-menu']}>
					<ul>
						<li>
							<Link href={`/c/${user?.id}`}>Мой канал</Link>
						</li>
						<li>
							<Link href={`/studio`}>В студию</Link>
						</li>
						<li>
							<button onClick={logout}>Выйти</button>
						</li>
					</ul>
				</div>
			)}
		</div>
	)
}

export default ProfileMenu
