import Link from 'next/link'
import { FC, useState } from 'react'
import { useEffect } from 'react'

import Layout from '@/components/layout/Layout'
import Button from '@/components/ui/button/Button'
import Catalog from '@/components/ui/catalog/Catalog'
import ChannelInfoSmall from '@/components/ui/channel-info-small/ChannelInfoSmall'
import LittleLoader from '@/components/ui/little-loader/LittleLoader'
import SubscribeButton from '@/components/ui/subscribe-button/SubscribeButton'

import { useAuth } from '@/hooks/useAuth'

import { api } from '@/store/api/api'
import { videoApi } from '@/store/api/video.api'

import styles from './Channel.module.scss'
import { IChannel } from './channel.interface'

const Channel: FC<IChannel> = ({ channel }) => {
	const [removeHandler, setRemoveHandler] = useState<
		((id: number) => void) | undefined
	>(undefined)
	const [deleteVideo, { isSuccess, isError }] =
		videoApi.useDeleteVideoMutation()

	const [isUpdateLink, setIsUpdateLink] = useState(false)

	const [currentChannel, setCurrentChannel] = useState(channel)
	const [isCurrentUser, setIsCurrentUser] = useState(false)
	const { user } = useAuth()

	const { data: profile, isSuccess: isOwnerLoadedSuccess } =
		api.useGetProfileQuery(null, {
			skip: !isCurrentUser
		})

	useEffect(() => {
		console.log('isOwnerLoadedSuccess', isOwnerLoadedSuccess)

		if (isOwnerLoadedSuccess) {
			setCurrentChannel(profile)
		}
	}, [profile, isOwnerLoadedSuccess])

	useEffect(() => {
		if (user?.id && channel?.id && user.id === channel.id) {
			setIsUpdateLink(true)
			setRemoveHandler(() => (id: number) => deleteVideo(id))
			setIsCurrentUser(true)
		}
	}, [channel])

	if (!channel?.id)
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
					<ChannelInfoSmall channel={currentChannel} />
					<SubscribeButton
						channelIdForSubscribe={currentChannel.id}
					/>
				</div>

				<article className='text-gray-500 mt-3'>
					<div className='text-white'>Описание канала:</div>
					{currentChannel.description}
				</article>
			</div>
			<Catalog
				isUpdateLink={isUpdateLink}
				removeHandler={removeHandler}
				newVideos={currentChannel.videos || []}
			/>
		</Layout>
	)
}

export default Channel
