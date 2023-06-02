import cn from 'classnames'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { FC, useEffect } from 'react'

import { IVideo } from '@/types/video.interface'

import UserAvatar from '../userAvatar/UserAvatar'

import VideoDuration from './VideoDuration'
import styles from './VideoItem.module.scss'
import VideoStatistics from './VideoStatistics'

const VideoItemLarge: FC<{ video: IVideo }> = ({ video }) => {
	const { push } = useRouter()
	return (
		<div
			onClick={() => push(`/v/${video.id}`)}
			className={cn(styles.video_item, styles.large_item)}
		>
			<div className={styles.thumbnail}>
				{video.thumbnailPath && (
					<Image
						src={video.thumbnailPath}
						alt={video.name}
						// width={185}
						// height={103}
						layout='fill'
						className={styles['bg-image']}
						priority
					/>
				)}
				<VideoDuration duration={video.duration} />

				<div
					className={cn(
						styles.information,
						styles.information_with_bg
					)}
				>
					<div className={styles.name}>{video.name}</div>

					<div
						className={styles.authorLink}
						onClick={e => {
							e.preventDefault()
							e.stopPropagation()
							push(`/c/${video.user.id}`)
						}}
					>
						<UserAvatar user={video.user} isWhite />

						<div className={styles.author}>{video.user?.name}</div>
					</div>

					<VideoStatistics
						views={video.views}
						createdAt={video.createdAt}
					/>
				</div>
			</div>
		</div>
	)
}

export default VideoItemLarge
