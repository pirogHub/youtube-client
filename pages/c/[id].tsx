import { GetStaticPaths, GetStaticProps, NextPage } from 'next'
import { FC } from 'react'

import Channel from '@/components/pages/home/channel/Channel'
import { IChannel } from '@/components/pages/home/channel/channel.interface'

import { UserService } from '@/services/user.service'

import { IUser } from '@/types/user.interface'

const ChannelPage: NextPage<IChannel> = ({ channel }) => {
	return <Channel channel={channel} />
}

export const getStaticPaths: GetStaticPaths = async () => {
	try {
		const { data: users } = await UserService.getAll()
		const paths = users.map(user => ({
			params: {
				id: String(user.id)
			}
		}))
		return {
			paths,
			fallback: 'blocking'
		}
	} catch (error) {
		return {
			paths: [],
			fallback: false
		}
	}
}

export const getStaticProps: GetStaticProps = async props => {
	console.log('props', props)
	const { params } = props

	try {
		const { data: channel } = await UserService.getUserById(
			Number(params?.id)
		)

		return {
			props: {
				channel
			} as IChannel
		}
	} catch (error) {
		return {
			props: {
				channel: {} as IUser
			} as IChannel
		}
	}
}

export default ChannelPage
