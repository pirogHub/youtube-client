import cn from 'classnames'
import { Dispatch, FC, SetStateAction } from 'react'

import { IMediaResponse } from '@/services/media/media.interface'

import styles from './UploadField.module.scss'
import { useUpload } from './useUpload'

interface IUploadField {
	title?: string
	folder?: string
	onChange: (...event: any) => void
	setValue?: (arg0: number) => void
	setIsChosen?: Dispatch<SetStateAction<boolean>>
	wrapperStyle?: string
}

const UploadField: FC<IUploadField> = ({
	folder,
	onChange,
	setIsChosen,
	setValue,
	title,
	wrapperStyle
}) => {
	const { uploadFile, isErrorWhenUpload } = useUpload(
		onChange,
		folder,
		setValue,
		setIsChosen
	)
	return (
		<div className={cn(styles.file, { wrapperStyle: wrapperStyle })}>
			{title && <h1>{title}</h1>}
			<label className='cursor-pointer'>
				{/* <span>Выберите файл</span> */}
				<input
					className='cursor-pointer'
					type='file'
					onChange={uploadFile}
				/>
			</label>
		</div>
	)
}

export default UploadField
