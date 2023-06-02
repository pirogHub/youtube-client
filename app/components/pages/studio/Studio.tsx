import { FC } from 'react'

import Layout from '@/components/layout/Layout'
import Catalog from '@/components/ui/catalog/Catalog'
import Loader from '@/components/ui/loader/Loader'

import { api } from '@/store/api/api'
import { videoApi } from '@/store/api/video.api'

import styles from './Studio.module.scss'

const Studio: FC = () => {
	const { data, isLoading } = api.useGetProfileQuery(null)
	const [removeVideo] = videoApi.useDeleteVideoMutation()

	const videos = data?.videos
	return (
		<Layout title='Creative Studio'>
			<div>
				{isLoading ? (
					<Loader count={5} />
				) : videos?.length ? (
					<Catalog
						newVideos={videos}
						removeHandler={removeVideo}
						isUpdateLink
					/>
				) : (
					<p>Видео не найдено!</p>
				)}
			</div>
		</Layout>
	)
}

export default Studio
