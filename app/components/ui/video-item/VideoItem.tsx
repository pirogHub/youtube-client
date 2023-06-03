import cn from 'classnames'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { FC, useState } from 'react'
import { BiEdit, BiTrash } from 'react-icons/bi'

import UserAvatar from '../userAvatar/UserAvatar'

import VideoDuration from './VideoDuration'
import styles from './VideoItem.module.scss'
import VideoStatistics from './VideoStatistics'
import { IVideoItem } from './video-item.interface'

const VideoItem: FC<IVideoItem> = ({
	isSmall,
	isUpdateLink,
	removeHandler,
	item
}) => {
	const { push } = useRouter()
	const [isMouseOnEdit, setIsMouseOnEdit] = useState(false)

	return (
		<Link
			href={`/v/${item.id}`}
			className={cn(styles.video_item, 'z-0', {
				[styles.small]: isSmall
			})}
		>
			{isMouseOnEdit && <div className={styles.shadower} />}
			{(!!removeHandler || !!isUpdateLink) && (
				<div
					onMouseEnter={() => setIsMouseOnEdit(true)}
					onMouseLeave={() => setIsMouseOnEdit(false)}
					className={styles.actionsWrapper}
				>
					{!!removeHandler && (
						<button
							className={'z-10'}
							onClick={e => {
								e.preventDefault()
								e.stopPropagation()
								removeHandler(item.id)
							}}
						>
							<BiTrash className={'text-lg text-red-700'} />
						</button>
					)}
					{isUpdateLink && (
						<button
							className='z-10'
							onClick={e => {
								e.preventDefault()
								e.stopPropagation()
								push(`/video/edit/${item.id}`)
							}}
						>
							<BiEdit className='text-lg bottom-3 text-cyan-800' />
						</button>
					)}
				</div>
			)}

			<div className={styles.thumbnail}>
				{item.thumbnailPath ? (
					<Image
						src={item.thumbnailPath}
						alt={item.name}
						// width={185}
						// height={103}
						// layout='responsive'
						fill
						priority
					/>
				) : (
					<div
						style={{ width: '100%', height: '100%' }}
						className='flex justify-center items-center text-center m-auto'
					>
						Превью нет
					</div>
				)}
				<VideoDuration duration={item.duration} />

				<div className={'absolute right-3 -bottom-7'}>
					<UserAvatar user={item.user} />
				</div>
			</div>

			<div className={styles.information}>
				{!isSmall && (
					<div className={styles.author}>{item.user?.name}</div>
				)}
				<Link href={`/v/${item.id}`} className={styles.name}>
					{item.name}
				</Link>

				<VideoStatistics
					views={item.views}
					createdAt={!isSmall ? item.createdAt : undefined}
				/>
			</div>
		</Link>
	)
}

export default VideoItem
