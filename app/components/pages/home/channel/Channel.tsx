import { FC } from 'react'

import Layout from '@/components/layout/Layout'
import Catalog from '@/components/ui/catalog/Catalog'
import ChannelInfoSmall from '@/components/ui/channel-info-small/ChannelInfoSmall'
import SubscribeButton from '@/components/ui/subscribe-button/SubscribeButton'

import styles from './Channel.module.scss'
import { IChannel } from './channel.interface'

const Channel: FC<IChannel> = ({ channel }) => {
	return (
		<Layout title={channel.name}>
			<div className={'mb-10 w-1/3'}>
				<div className={'flex items-center gap-8'}>
					<ChannelInfoSmall channel={channel} />
					<SubscribeButton channelIdForSubscribe={channel.id} />
				</div>
				<article className='text-gray-500 mt-3'>
					{channel.description}
				</article>
			</div>
			<Catalog newVideos={channel.videos || []} />
		</Layout>
	)
}

export default Channel
