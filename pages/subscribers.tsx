import { NextPageAuth } from 'provider/private-route.interface'
import { FC } from 'react'

import Layout from '@/components/layout/Layout'
import Menu from '@/components/layout/sidebar/menu/Menu'

import { api } from '@/store/api/api'

const SubscribtionsPage: NextPageAuth = () => {
	const { data } = api.useGetProfileQuery(null)
	return (
		<Layout title='Мои подписки'>
			<Menu
				title='Мои подписки'
				isWhenNoImage
				items={
					data?.subscriptions.map(({ toChannel }) => ({
						title: toChannel.name,
						image: toChannel.avatarPath,
						link: `/c/${toChannel.id}`
					})) || []
				}
			/>
		</Layout>
	)
}

SubscribtionsPage.isAuthUser = true

export default SubscribtionsPage
