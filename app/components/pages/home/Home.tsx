import { FC } from 'react'

import Layout from '@/components/layout/Layout'

import Catalog from './catalog/Catalog'
import Discover from './discover/Discover'
import { IHome } from './home.interface'

const Home: FC<IHome> = () => {
	return (
		<Layout title='Видеохостинг'>
			<Discover />
			<Catalog />
		</Layout>
	)
}

export default Home
