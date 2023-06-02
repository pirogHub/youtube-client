import cn from 'classnames'
import { FC } from 'react'
import { BsFullscreen } from 'react-icons/bs'
import { IoMdPause, IoMdPlay } from 'react-icons/io'

import styles from './VideoPlayer.module.scss'
import { usePlayer } from './usePlayer'

const VideoPlayer: FC<{ videoPath: string }> = ({ videoPath }) => {
	const { videoRef, toggleVideo, status, fullScreen } = usePlayer()
	return (
		<div className={styles.wrapper}>
			<video
				ref={videoRef}
				src={`${videoPath}#t=8`}
				className={styles.player}
				preload='metadata'
				onClick={toggleVideo}
			/>
			<div
				className={cn(styles.controls, {
					[styles.hide]: status.isPlaying
				})}
			>
				<button onClick={toggleVideo}>
					{status.isPlaying ? <IoMdPause /> : <IoMdPlay />}
				</button>

				<div className={styles.progressBarWrapepr}>
					<div
						className={styles.progressBar}
						style={{
							width: `${status.progress}`
						}}
					/>
				</div>

				<div className={styles.timeControls}>
					<p>
						{Math.floor(status.currentTime / 60) +
							':' +
							('0' + Math.floor(status.currentTime % 60)).slice(
								-2
							)}
					</p>
					<p>/</p>
					<p>
						{Math.floor(status.videoTime / 60) +
							':' +
							('0' + Math.floor(status.videoTime % 60)).slice(-2)}
					</p>
				</div>
				<button onClick={fullScreen}>
					<BsFullscreen className='text-tiny' />
				</button>
			</div>
		</div>
	)
}

export default VideoPlayer
