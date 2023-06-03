import { FC, useState } from 'react'
import { HiUpload } from 'react-icons/hi'

import LittleLoader from '@/components/ui/little-loader/LittleLoader'
import ModalWindow from '@/components/ui/modal-window/ModalWindow'

import { videoApi } from '@/store/api/video.api'

import UploadModal from './UploadModal'
import stylesIconBtn from '@/styles/iconsButtons.module.scss'

const UploadVideo: FC = () => {
	const [isOpen, setIsOpen] = useState(false)
	const [videoId, setVideoId] = useState<number>(0)

	const [createVideo, { isLoading }] = videoApi.useCreateVideoMutation()
	const [isOpenLoading, setIsOpenLoading] = useState(false)
	return (
		<>
			<button
				onClick={() => {
					setIsOpenLoading(true)
					createVideo()
						.unwrap()
						.then(id => {
							setVideoId(+id)
							setIsOpenLoading(false)
							setIsOpen(true)
						})
				}}
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
			<ModalWindow
				isOpen={isOpenLoading}
				setIsOpen={setIsOpenLoading}
				videoId={videoId}
			>
				<LittleLoader />
			</ModalWindow>
		</>
	)
}

export default UploadVideo
