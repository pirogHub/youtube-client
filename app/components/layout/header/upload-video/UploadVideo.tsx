import { FC, useState } from 'react'
import { HiUpload } from 'react-icons/hi'

import { videoApi } from '@/store/api/video.api'

import UploadModal from './UploadModal'
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
				<HiUpload className='text-lime-400 hover:text-primary' />
				<div className={stylesIconBtn.buttonWarning}>
					Загрузить видео
				</div>
			</button>
			<UploadModal
				isOpen={isOpen}
				setIsOpen={setIsOpen}
				videoId={videoId}
			/>
		</>
	)
}

export default UploadVideo
