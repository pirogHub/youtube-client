import { FC } from 'react'

import Layout from '@/components/layout/Layout'

import Catalog from '../../ui/catalog/Catalog'

import Discover from './discover/Discover'
import { IHome } from './home.interface'

const Home: FC<IHome> = ({ newVideos, randomVideo, topVideo }) => {
	return (
		<Layout title='Видеохостинг'>
			<Discover topVideo={topVideo} randomVideo={randomVideo} />
			<Catalog newVideos={newVideos} />
		</Layout>
	)
}

export default Home
