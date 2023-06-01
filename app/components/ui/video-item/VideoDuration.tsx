import { FC } from 'react'

import styles from './VideoItem.module.scss'

const VideoDuration: FC<{ duration?: number; isBottom?: boolean }> = ({
	duration,
	isBottom
}) => {
	return duration ? (
		<time className={isBottom ? styles.bottom : ''}>{duration} мин.</time>
	) : null
}

export default VideoDuration
