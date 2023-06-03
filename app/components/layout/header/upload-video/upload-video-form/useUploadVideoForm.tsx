import { useEffect, useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { toastr } from 'react-redux-toastr'

import { IMediaResponse } from '@/services/media/media.interface'

import { IVideoDto } from '@/types/video.interface'

import { videoApi } from '@/store/api/video.api'

interface IUseUploadVideoForm {
	handleCloseModal: () => void
	videoId: number
}

export const useUploadVideoForm = ({
	handleCloseModal,
	videoId
}: IUseUploadVideoForm) => {
	const {
		register,
		formState: { errors },
		control,
		handleSubmit,
		watch,
		setValue,
		reset
	} = useForm<IVideoDto>({
		mode: 'onChange',
		defaultValues: {
			isPublic: true
		}
	})
	const [updateVideo, { isSuccess, isError }] =
		videoApi.useUpdateVideoMutation()

	const onSubmit: SubmitHandler<IVideoDto> = data => {
		updateVideo({ ...data, id: videoId })
			.unwrap()
			.then(() => {
				handleCloseModal()
				reset()
			})
	}
	const [isGlobalError, setIsGlobalError] = useState(false)
	const videoPath = watch('videoPath')
	const thumbnailPath = watch('thumbnailPath')
	const [videoFileName, setVideoFileName] = useState('')

	const handleUploadVideo = (value: IMediaResponse) => {
		if (!value) {
			setIsGlobalError(true)
			setIsChosen(false)
			handleCloseModal()
			reset()
			return
		}
		setIsGlobalError(false)
		setValue('videoPath', value.url)
		setValue('name', value.name)
		setVideoFileName(value.name)
	}

	useEffect(() => {
		if (isError) setIsGlobalError(isError)
	}, [isError])

	const [isChosen, setIsChosen] = useState(false)

	const [percent, setPercent] = useState(0)
	const [isUploaded, setIsUploaded] = useState(false)
	const setProgressPercentage = (val: number) => {
		setPercent(val)
		if (val === 100) setIsUploaded(true)
	}

	return {
		form: {
			errors,
			register,
			control,
			handleSubmit,
			onSubmit
		},
		status: {
			setProgressPercentage,
			setIsChosen,
			isUploaded,
			percent,
			isSuccess,
			isChosen,
			isError
		},
		media: {
			videoPath,
			videoFileName,
			thumbnailPath,
			handleUploadVideo
		},
		isGlobalError
	}
}
