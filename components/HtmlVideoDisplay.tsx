import { createRef, useEffect, useRef } from "react";
import VideoControls from './VideoControls';
import { useVideoContext } from './VideoContextProvider';

interface Props{
    url: string,
    width?: number,
    controls?: boolean
}

const VideoPlayer = ({
    url,
    width = 650,
    controls = false,
} : Props ) => {

const [ videoData, setVideoData ] = useVideoContext();
const media = useRef(null);

useEffect(()=>{
    if(media.current.duration)
        setVideoData({...videoData, durationMS: media.current.duration * 1000})
}, [media.current? media.current.duration : null])

useEffect(()=>{
    if(videoData.paused)
        media.current.pause();
    else
        media.current.play();
}, [videoData.paused])

useEffect(()=>{
    (async()=>{
        media.current.currentTime = videoData.setMS/1000;
    })();
}, [videoData.setMS])

function onPause(paused: boolean){
    setVideoData({...videoData, paused: paused})
}

function onTimeUpdate(seconds: number){
    setVideoData({...videoData, currentMS: seconds*1000 })
}
    return (
        <div className="video">
            <video ref={media}
            onPause={()=>onPause(media.current.paused)}
            onTimeUpdate={()=>onTimeUpdate(media.current.currentTime)}
            controls={controls}
            id='videoPlayer'
            >
            <source src={url} type="video/mp4"/>
            Your browser does not support the video tag.
            </video>
            <style jsx>{`
                #videoPlayer{
                    width: 100%;
                    height: 100%;
                }
                .video{
                    width: 100%;
                    height: 100%;
                    display: flex;
                    flex-flow: column;
                    align-items: left;
                }
            `}</style>
        </div>
    );
}

export default VideoPlayer;