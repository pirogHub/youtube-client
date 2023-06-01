import { FC, useState } from 'react'
import { HiUpload } from 'react-icons/hi'

import { videoApi } from '@/store/api/video.api'

import styles from './UploadVideo.module.scss'
import stylesIconBtn from '@/styles/iconsButtons.module.scss'

const UploadVideo: FC = () => {
	const [isOpen, setIsOpen] = useState(false)
	const [videoId, setVideoId] = useState<number>(0)

	const [createVideo, { isLoading }] = videoApi.useCreateVideoMutation()

	return (
		<>
			<button
				onClick={() =>
					createVideo()
						.unwrap()
						.then(id => {
							setVideoId(+id)
							setIsOpen(true)
						})
				}
				className={stylesIconBtn.button}
				disabled={isLoading}
			>
				<HiUpload />
			</button>
		</>
	)
}

export default UploadVideo
