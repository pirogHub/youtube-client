import { GetStaticPaths, GetStaticProps, NextPage } from 'next'
import { FC } from 'react'

import Video from '@/components/pages/video/Video'

import { UserService } from '@/services/user.service'

import { IUser } from '@/types/user.interface'
import { IVideo } from '@/types/video.interface'

const VideoPage: NextPage = props => {
	return <Video {...props} />
}

// export const getStaticPaths: GetStaticPaths = async () => {
// 	try {
// 		const { data: users } = await UserService.getAll()
// 		const paths = users.map(user => ({
// 			params: {
// 				id: String(user.id)
// 			}
// 		}))
// 		return {
// 			paths,
// 			fallback: 'blocking'
// 		}
// 	} catch (error) {
// 		return {
// 			paths: [],
// 			fallback: false
// 		}
// 	}
// }

// export const getStaticProps: GetStaticProps = async ({ params }) => {
// 	try {
// 		const { data: Video } = await UserService.getUserById(
// 			Number(params?.id)
// 		)

// 		return {
// 			props: {
// 				Video
// 			} as IVideo
// 		}
// 	} catch (error) {
// 		return {
// 			props: {
// 				Video: {} as IUser
// 			} as IVideo
// 		}
// 	}
// }

export default VideoPage
