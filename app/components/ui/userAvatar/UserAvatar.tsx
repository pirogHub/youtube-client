import cn from 'classnames'
import Image from 'next/image'
import Link from 'next/link'
import { FC } from 'react'
import { BsFillPersonFill, BsPersonCircle } from 'react-icons/bs'
import { IoIosCheckmarkCircle } from 'react-icons/io'

import { IUser } from '@/types/user.interface'

import styles from './UserAvatar.module.scss'

const UserAvatar: FC<{ user: IUser; isWhite?: boolean }> = ({
	user,
	isWhite
}) => {
	return (
		<div>
			<span
				className={cn(styles.avatar, {
					[styles.white]: isWhite,
					[styles.withoutborder]: !user.avatarPath
				})}
			>
				{user.avatarPath ? (
					<Image
						width={45}
						height={45}
						alt={user.name}
						src={user.avatarPath || ''}
					/>
				) : (
					<BsPersonCircle
						style={{ fontSize: '4rem', fill: '#444' }}
					/>
				)}
				{user.isVerified && (
					<span className={styles.isVerified}>
						<IoIosCheckmarkCircle />
					</span>
				)}
			</span>
		</div>
	)
}

export default UserAvatar
