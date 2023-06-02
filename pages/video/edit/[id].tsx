import { NextPageAuth } from 'provider/private-route.interface'
import { FC } from 'react'

import VideoEdit from '@/components/pages/video-edit/VideoEdit'

const VideoEditPage: NextPageAuth = () => {
	return <VideoEdit />
}

VideoEditPage.isAuthUser = true

export default VideoEditPage
