import { FC } from 'react'
import { Controller } from 'react-hook-form'

import Field from '@/components/ui/Field/Field'
import TextArea from '@/components/ui/text-area/TextArea'
import UploadField from '@/components/ui/upload-field/UploadField'

import { IMediaResponse } from '@/services/media/media.interface'

import styles from '../UploadVideo.module.scss'

import SuccessMessage from './SuccessMessage'
import FooterForm from './footer-form/FooterForm'
import TogglePublic from './toggle-public/TogglePublic'
import { useUploadVideoForm } from './useUploadVideoForm'
import VideoInformation from './video-information/VideoInformation'

const UploadVideoForm: FC<{
	videoId: number
	handleCloseModal: () => void
}> = ({ handleCloseModal, videoId }) => {
	const { form, status, media, isGlobalError } = useUploadVideoForm({
		videoId,
		handleCloseModal
	})

	return (
		<form
			onSubmit={form.handleSubmit(form.onSubmit)}
			className='flex flex-wrap'
		>
			{status.isSuccess && <SuccessMessage />}

			{status.isChosen ? (
				<>
					<div className='w-7/12 pr-6 pt-3'>
						<Field
							{...form.register('name', {
								required: 'Название обязательно!'
							})}
							placeholder='Имя'
							error={form.errors.name}
						/>
						<TextArea
							{...form.register('description', {
								required: 'Описание обязательно!'
							})}
							placeholder='Описание'
							error={form.errors.description}
						/>

						<Controller
							control={form.control}
							name='isPublic'
							render={({ field: { onChange, value } }) => (
								<TogglePublic
									clickHandler={() => {
										onChange(!value)
									}}
									isEnabled={!!value}
								/>
							)}
						/>
					</div>
					<div className='w-5/12 p-3 pl-10'>
						<VideoInformation
							fileName={media.videoFileName}
							videoId={videoId}
							isUploaded={status.isUploaded}
							thumbnailPath={media.thumbnailPath}
						>
							<div className='mb-8 mt-2 flex'>
								<Controller
									control={form.control}
									name='thumbnailPath'
									render={({ field: { onChange } }) => (
										<UploadField
											wrapperStyle='m-0'
											folder='thumbnails'
											onChange={(
												value: IMediaResponse
											) => {
												onChange(value.url)
											}}
										/>
									)}
								/>
							</div>
						</VideoInformation>
					</div>
					<FooterForm
						isUploaded={status.isUploaded}
						percent={status.percent}
					/>
				</>
			) : (
				<div className={styles.uploadScreen}>
					<Controller
						control={form.control}
						name='videoPath'
						render={() => (
							<UploadField
								title={'Сначала загрузите видео'}
								folder='videos'
								onChange={media.handleUploadVideo}
								setValue={status.setProgressPercentage}
								setIsChosen={status.setIsChosen}
							/>
						)}
					/>
				</div>
			)}
		</form>
	)
}

export default UploadVideoForm
