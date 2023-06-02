import { useEffect, useCallback, useRef, useState } from 'react';
import { IVideoElement } from './video-player.interface';
export const usePlayer = () => {

    const videoRef = useRef<IVideoElement>(null)

    const [isShowButton, setIsShowButton] = useState(true)
    const [isPlaying, setIsPlaying] = useState(true)
    const [currentTime, setCurrentTime] = useState(0)
    const [videoTime, setVideoTime] = useState(0)
    const [progress, setProgress] = useState(0)


    useEffect(() => {
        const originalDuration = videoRef.current?.duration
        if (originalDuration) setVideoTime(originalDuration)
    }, [videoRef.current?.duration])

    const toggleVideo = useCallback(() => {
        if (!isPlaying) {
            videoRef.current?.play()
            setIsPlaying(true)
            setTimeout(() => {
                setIsShowButton(false)
            }, 1500)
        } else {
            setIsShowButton(true)
            videoRef.current?.pause()
            setIsPlaying(false)
        }
    }, [isPlaying])

    const forward = () => {
        if (videoRef.current) videoRef.current.currentTime += 15
    }
    const revert = () => {
        if (videoRef.current) videoRef.current.currentTime -= 15
    }

    const fullScreen = () => {
        const video = videoRef.current
        if (!video) return
        if (video.requestFullscreen) {
            video.requestFullscreen()
        } else if (video.msRequestFullscreen) {
            video.msRequestFullscreen()
        } else if (video.mozRequestFullscreen) {
            video.mozRequestFullscreen()
        } else if (video.webkitRequestFullscreen) {
            video.webkitRequestFullscreen()
        }
    }
    useEffect(() => {
        const video = videoRef.current
        if (!video) return

        const updateProgress = () => {
            setCurrentTime(video.currentTime)
            setProgress((video.currentTime / videoTime) * 100)


            if (isPlaying && video.currentTime >= videoTime) {
                setIsPlaying(false)
            }
        }

        video.addEventListener('timeupdate', updateProgress)

        return () => {
            video.removeEventListener("timeupdate", updateProgress)
        }
    })

    useEffect(() => {
        const video = videoRef.current
        if (!video) return

        const handleKeyDown = (e: KeyboardEvent) => {
            switch (e.key) {
                case "ArrowRight":
                    forward()
                    break;
                case "ArrowLeft":
                    revert()
                    break;
                case " ":
                    e.preventDefault()
                    toggleVideo()
                    break;
                case "f":
                    fullScreen()
                    break;
                default:
                    break;
            }

            video.addEventListener('keydown', handleKeyDown)
            return () => video.removeEventListener('keydown', handleKeyDown)
        }
    }, [toggleVideo, videoRef.current])



    return {
        videoRef,
        toggleVideo,
        fullScreen,
        status: {
            isPlaying,
            progress,
            currentTime,
            videoTime
        }
    }
}