import cn from 'classnames'
import Image from 'next/image'
import Link from 'next/link'
import { FC, useState } from 'react'
import { BsFillPersonFill, BsPersonCircle } from 'react-icons/bs'
import { IoIosCheckmarkCircle } from 'react-icons/io'

import { IUser } from '@/types/user.interface'

import styles from './UserAvatar.module.scss'

const UserAvatar: FC<{ user: IUser; isWhite?: boolean; isSmall?: boolean }> = ({
	user,
	isWhite,
	isSmall
}) => {
	const [size, setSize] = useState(isSmall ? 30 : 45)
	return (
		<div>
			<span
				className={cn(styles.avatar, {
					[styles.white]: isWhite,
					[styles.withoutborder]: !user?.avatarPath,
					[styles.small]: isSmall
				})}
			>
				{user?.avatarPath ? (
					<Image
						width={size}
						height={size}
						alt={user?.name}
						src={user?.avatarPath || ''}
					/>
				) : (
					<BsPersonCircle
						style={{
							fontSize: isSmall ? '2rem' : '4rem',
							fill: '#444'
						}}
					/>
				)}
				{user?.isVerified && (
					<span className={styles.isVerified}>
						<IoIosCheckmarkCircle />
					</span>
				)}
			</span>
		</div>
	)
}

export default UserAvatar
