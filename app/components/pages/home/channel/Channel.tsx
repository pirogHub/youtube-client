import Link from 'next/link'
import { FC } from 'react'

import Layout from '@/components/layout/Layout'
import Button from '@/components/ui/button/Button'
import Catalog from '@/components/ui/catalog/Catalog'
import ChannelInfoSmall from '@/components/ui/channel-info-small/ChannelInfoSmall'
import SubscribeButton from '@/components/ui/subscribe-button/SubscribeButton'

import styles from './Channel.module.scss'
import { IChannel } from './channel.interface'

const Channel: FC<IChannel> = ({ channel }) => {
	if (!channel.id)
		return (
			<Layout title='Видеохостинг'>
				<div className={'mb-10 w-1/3'}>
					<div className='text-white'> Такого канала нет</div>
					<div>
						<Link href={'/'}>
							<Button>На главную</Button>
						</Link>
					</div>
				</div>
			</Layout>
		)
	return (
		<Layout title={channel.name}>
			<div className={'mb-10'}>
				<div className={'flex items-center gap-8'}>
					<ChannelInfoSmall channel={channel} />
					<SubscribeButton channelIdForSubscribe={channel.id} />
				</div>

				<article className='text-gray-500 mt-3'>
					<div className='text-white'>Описание канала:</div>
					{channel.description}
				</article>
			</div>
			<Catalog
				isUpdateLink
				removeHandler={() => {}}
				newVideos={channel.videos || []}
			/>
		</Layout>
	)
}

export default Channel
