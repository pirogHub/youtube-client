import Image from 'next/image'
import Link from 'next/link'
import { FC, PropsWithChildren } from 'react'

import styles from './VideoInformation.module.scss'

interface IVideoInformation {
	thumbnailPath?: string
	videoId: number
	fileName: string
	isUploaded: boolean
}

const VideoInformation: FC<PropsWithChildren<IVideoInformation>> = ({
	videoId,
	thumbnailPath,
	fileName,
	isUploaded,
	children
}) => {
	return (
		<div className={styles.info}>
			{!thumbnailPath ? (
				<div className={styles.thumbnail}>
					{!isUploaded ? 'Идет загрузка...' : 'Загрузите превью'}
				</div>
			) : (
				<Image
				// loader={}
					src={thumbnailPath}
					width={344}
					height={190}
					alt=''
					layout='responsive'
				/>
			)}
			{!!children && children}
			<div className={styles.details}>
				<div>
					<span>Ссылка на видео</span>
					<span>
						<Link href={`/v/${videoId}`}>
							{`${process.env.APP_URL}/v/${videoId}`}
						</Link>
					</span>
				</div>
				<div>
					<span>Имя файла</span>
					<span>{fileName}</span>
				</div>
			</div>
		</div>
	)
}

export default VideoInformation
