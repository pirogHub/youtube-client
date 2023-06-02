import { FC } from 'react'

import Heading from '@/components/ui/heading/Heading'
import VideoItem from '@/components/ui/video-item/VideoItem'

import { IVideo } from '@/types/video.interface'

import styles from './Catalog.module.scss'

interface ICatalog {
	newVideos: IVideo[]
	removeHandler?: (video: number) => void
	isUpdateLink?: boolean
}

const Catalog: FC<ICatalog> = ({ newVideos, isUpdateLink, removeHandler }) => {
	return (
		<div className={styles.recommended}>
			<div className={styles.top_block}>
				<Heading title={removeHandler ? 'Мои видео' : 'Рекомендации'} />
			</div>

			<div className={styles.catalog}>
				{newVideos.map(v => (
					<VideoItem
						item={v}
						key={v.id}
						removeHandler={removeHandler}
						isUpdateLink={isUpdateLink}
					/>
				))}
			</div>
		</div>
	)
}

export default Catalog
