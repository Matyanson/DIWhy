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
    setVideoData({...videoData, lengthMS: media.current.duration * 100})
    console.log(`setting duration to: ${media.current.duration}`);
}, [media.current])

useEffect(()=>{
    if(videoData.paused)
        media.current.pause();
    else
        media.current.play();
}, [videoData.paused])
useEffect(()=>{
    media.current.currentTime = videoData.currentMS/100;
}, [videoData.currentMS])

function onPause(paused: boolean){
    setVideoData({...videoData, paused: paused})
}

function onTimeUpdate(seconds: number){
    setVideoData({...videoData, currentMS: seconds*100 })
}
    return (
        <div className="video">
            <div>
                <video ref={media}
                onPause={()=>onPause(media.current.paused)}
                onTimeUpdate={()=>onTimeUpdate(media.current.currentTime)}
                width={width}
                controls={controls}
                >
                <source src={url} type="video/mp4"/>
                Your browser does not support the video tag.
                </video>
            </div>
            <style jsx>{`
                .video{
                    display: flex;
                    flex-flow: column;
                    align-items: left;
                    width: fit-content;
                    margin: 10px;
                }
            `}</style>
        </div>
    );
}

export default VideoPlayer;