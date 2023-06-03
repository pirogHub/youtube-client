import shuffle from 'lodash/shuffle'
import { GetStaticProps, NextPage } from 'next'
import { NextPageAuth } from 'provider/private-route.interface'

import Home from '@/components/pages/home/Home'
import { IHome } from '@/components/pages/home/home.interface'

import { VideoService } from '@/services/video.service'

import { IVideo } from '@/types/video.interface'

const HomePage: NextPage<IHome> = props => {
	return <Home {...props} />
}

export const getStaticProps: GetStaticProps = async () => {
	try {
		const { data: newVideos } = await VideoService.getAll()
		const { data: popularVideos } = await VideoService.getMostPopular()

		return {
			props: {
				newVideos: newVideos || [],
				topVideo: popularVideos[0] || ({} as IVideo),
				randomVideo:
					shuffle(
						newVideos.filter(v => v.id !== popularVideos[0].id)
					)[0] || ({} as IVideo)
			} as IHome,
			revalidate: 60
		}
	} catch (error) {
		return {
			props: {
				newVideos: [],
				topVideo: {} as IVideo,
				randomVideo: {} as IVideo
			} as IHome
		}
	}
}

export default HomePage
