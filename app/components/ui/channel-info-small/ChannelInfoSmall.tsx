import { FC } from 'react'

import { IUser } from '@/types/user.interface'

import { formatNumberToK } from '@/utils/format-number-to-k'

import UserAvatar from '../userAvatar/UserAvatar'

import styles from './ChannelInfoSmall.module.scss'

const ChannelInfoSmall: FC<{
	channel: IUser
	message?: string
	isSmall?: boolean
}> = ({ channel, message, isSmall }) => {
	return (
		<div className={styles.profile_info}>
			<UserAvatar user={channel} isSmall={isSmall} />

			<div>
				<div className={styles.name}>{channel.name}</div>
				<div className={styles.subscribers_count}>
					{!!message ? (
						message
					) : (
						<>
							{formatNumberToK(channel.subscribersCount) +
								' subscribers'}
						</>
					)}
				</div>
			</div>
		</div>
	)
}

export default ChannelInfoSmall
