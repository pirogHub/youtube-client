import { FC } from 'react'

import VideoItemLarge from '@/components/ui/video-item/VideoItemLarge'

import { IVideo } from '@/types/video.interface'

import styles from './Discover.module.scss'

interface IDiscover {
	topVideo: IVideo
	randomVideo: IVideo
}

const Discover: FC<IDiscover> = ({ randomVideo, topVideo }) => {
	return (
		<div className={styles.discover}>
			<div className={styles.top_video}>
				<VideoItemLarge video={topVideo} />
			</div>

			<div className={styles.random_video}>
				<VideoItemLarge video={randomVideo} />
			</div>
		</div>
	)
}

export default Discover
