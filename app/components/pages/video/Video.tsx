import cn from 'classnames'
import { useRouter } from 'next/router'
import { FC } from 'react'
import { useEffect } from 'react'

import Layout from '@/components/layout/Layout'

import { IUser } from '@/types/user.interface'
import { IVideo } from '@/types/video.interface'

import { videoApi } from '@/store/api/video.api'

import styles from './Video.module.scss'
import Comments from './comments/Comments'
import VideoDetail from './video-detail/VideoDetail'
import VideoPlayer from './video-player/VideoPlayer'

const Video: FC = () => {
	const { query } = useRouter()

	const { data: video = {} as IVideo } = videoApi.useGetVideoByIdQuery(
		Number(query.id),
		{
			skip: !query?.id
		}
	)

	const [updateViews] = videoApi.useUpdateCountViewsMutation()

	useEffect(() => {
		if (query.id) updateViews(Number(query.id))
	}, [query.id])

	return (
		<Layout title={video.name}>
			<div className={styles.layout}>
				<VideoPlayer videoPath={video.videoPath} />

				<Comments videoId={video.id} comments={video.comments || []} />
			</div>
			<div className={cn(styles.layout, 'mt-7')}>
				<VideoDetail
					video={video}
					channel={video.user || ({} as IUser)}
				/>
				<div></div>
			</div>
		</Layout>
	)
}

export default Video
